let {PubgTournamentModel, PubgTournamentPlayerModel} = require('../../../Models/PubgModel');
let {WalletModel, WalletTransactionsModel} = require('../../../Models/WalletModel');
const mediaGetFile = require('../../../util/media').getFile;
const getTranslates = require('../../../util/glossary').getTranslates;
const translate = require('../../../util/glossary').translate;

class Actions {
    index(lang, page = undefined, size = undefined) {
        return new Promise((resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            let query = 'SELECT pubg.tournaments.id, pubg.tournaments.glossary_key_title as tournaments_glossary_key_title, pubg.tournaments.glossary_key_description as tournaments_glossary_key_description, pubg.tournaments.capacity, pubg.tournaments.start_date, pubg.tournaments.reward_value, pubg.tournaments.fee, pubg.tournaments.status, pubg.tournaments.youtube_link, pubg.tournaments.group_capacity, pubg.tournaments.username, pubg.tournaments.password, pubg.tournaments.map_id, pubg.maps.glossary_key_name as maps_glossary_key_name, pubg.maps.image_media_id as maps_image_media_id FROM pubg.tournaments ';
            let leftJoinQuery = ' LEFT JOIN pubg.maps ON (pubg.tournaments.map_id = pubg.maps.id) ';
            let orderQuery = ' ORDER BY pubg.tournaments.id DESC';

            pubgTournamentModel.fetch_all_custom(`${query} ${leftJoinQuery} ${orderQuery}`, page, size).then(async data => {
                let result = [];

                for (let i = 0; i < data.result.length; i++) {
                    data.result[i].map = {};
                    data.result[i].map['name'] = lang ? await translate(data.result[i].maps_glossary_key_name, lang) : await getTranslates(data.result[i].maps_glossary_key_name);
                    data.result[i].map['image'] = await mediaGetFile(data.result[i].maps_image_media_id);

                    data.result[i].title = lang ? await translate(data.result[i].tournaments_glossary_key_title, lang) : await getTranslates(data.result[i].tournaments_glossary_key_title);
                    data.result[i].description = lang ? await translate(data.result[i].tournaments_glossary_key_description, lang) : await getTranslates(data.result[i].tournaments_glossary_key_description);

                    result.push(data.result[i])
                }
                resolve({
                    status: true,
                    result,
                    total: data.total,
                })
            }).catch(reject)
        })
    }

    last(lang) {
        return new Promise((resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            let query = 'SELECT pubg.tournaments.id, pubg.tournaments.glossary_key_title as tournaments_glossary_key_title, pubg.tournaments.glossary_key_description as tournaments_glossary_key_description, pubg.tournaments.capacity, pubg.tournaments.start_date, pubg.tournaments.reward_value, pubg.tournaments.fee, pubg.tournaments.status, pubg.tournaments.youtube_link, pubg.tournaments.group_capacity, pubg.tournaments.username, pubg.tournaments.password, pubg.tournaments.map_id, pubg.maps.glossary_key_name as maps_glossary_key_name, pubg.maps.image_media_id as maps_image_media_id FROM pubg.tournaments ';
            let leftJoinQuery = ' LEFT JOIN pubg.maps ON (pubg.tournaments.map_id = pubg.maps.id) ';
            let orderQuery = ' ORDER BY pubg.tournaments.id DESC';

            pubgTournamentModel.fetch_all_custom(`${query} ${leftJoinQuery} ${orderQuery}`, 1, 1).then(async data => {
                let result = {};

                if (data.result.length > 0) {
                    result = data.result[0];

                    result.map = {};
                    result.map['name'] = lang ? await translate(result.maps_glossary_key_name, lang) : await getTranslates(result.maps_glossary_key_name);
                    result.map['image'] = await mediaGetFile(result.maps_image_media_id);

                    result.title = lang ? await translate(result.tournaments_glossary_key_title, lang) : await getTranslates(result.tournaments_glossary_key_title);
                    result.description = lang ? await translate(result.tournaments_glossary_key_description, lang) : await getTranslates(result.tournaments_glossary_key_description);
                }

                resolve(result)
            }).catch(reject)
        })
    }

    players(lang, id) {
        return new Promise((resolve, reject) => {
            let model = new PubgTournamentPlayerModel();
            model.fetch_all_custom(`SELECT * FROM pubg.tournament_players WHERE tournament_id = ${id} ORDER BY id ASC`).then(resolve).catch(reject)
        })
    }

    enter(lang, id, userId, characterName) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel();
            let walletModel = new WalletModel();
            let walletTransactionModel = new WalletTransactionsModel();
            try {
                pubgTournamentPlayerModel.fetch_one('*', ['user_id', 'tournament_id'], [userId, id]).then(async response => {

                    // if (!response) {
                    let tour = await pubgTournamentModel.fetch_one('*', ['id'], [id]);
                    let wallet = await walletModel.fetch_one('*', ['user_id'], [userId]);

                    if (wallet.amount < tour.fee) {
                        reject({
                            status: false,
                            msg: 'موجودی کافی نمی باشد'
                        })
                    } else {
                        walletTransactionModel.insertSync(
                            ['amount', 'type', 'wallet_id'],
                            [tour.fee, 'INCREASE', wallet.id]
                        ).then(data => {
                            let walletTransactionId = data.id;
                            walletModel.update(['amount'], [(wallet.amount - tour.fee).toFixed(2)], ['id'], [wallet.id]).then(response => {

                                // In below calculate group player and other options of new player of the tournament
                                pubgTournamentPlayerModel.fetch_all_custom('SELECT * FROM pubg.v_players_registered_count').then(data => {
                                    let playersRegisteredCount = data.result[0].players_count;

                                    if (playersRegisteredCount) {
                                        if (tour.capacity > playersRegisteredCount) {
                                            pubgTournamentPlayerModel.fetch_all_custom('SELECT * FROM pubg.v_groups_count ORDER BY count').then(data => {
                                                // Removing max groups from list because we want to add new user to tournament and it need group with empty capacity
                                                // get max count of group numbers
                                                let maxCount = Math.max.apply(Math, data.result.map(group => group.count));
                                                // get max group number created to now
                                                let maxGroupNumber = Math.max.apply(Math, data.result.map(group => group.group_number));
                                                // If group numbers has fill group then
                                                if (maxCount === tour.group_capacity) {
                                                    // Get index of max fill group
                                                    let index = data.result.findIndex(group => count === maxCount);
                                                    // Remove max groups from array of data
                                                    data.result.splice(
                                                        tour.group_capacity.findIndex(group => count === maxCount),
                                                        data.result.length - index
                                                    );

                                                    // If data has groups with capacity then
                                                    if (data.result.length > 0) {
                                                        // get max group and group number for add new user to it
                                                        maxCount = Math.max.apply(Math, data.result.map(group => group.count));
                                                        maxGroupNumber = data.result.find(group => group.count === maxCount).group_number;
                                                    }
                                                    // Else max group number increasing one step to create new group
                                                    else {
                                                        maxGroupNumber++;
                                                    }
                                                }

                                                pubgTournamentPlayerModel.insertSync(
                                                    ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                                                    [characterName, maxGroupNumber, walletTransactionId, id, userId]
                                                ).then(response => {
                                                    resolve({status: true})
                                                }).catch(e => {
                                                    reject({status: false})
                                                });

                                            }).catch(e => {
                                                reject(e)
                                            });
                                        } else {
                                            reject({status: true, msg: 'ظرفیت تکمیل است'})
                                        }
                                    } else {
                                        // Add first user(player) in the tournament
                                        pubgTournamentPlayerModel.insertSync(
                                            ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                                            [characterName, 1, walletTransactionId, id, userId]
                                        ).then(response => {
                                            resolve({status: true})
                                        }).catch(e => {
                                            reject({status: false})
                                        });
                                    }
                                }).catch(e => {
                                    reject(e)
                                });

                            }).catch(e => {
                                reject(e)
                            });
                        }).catch(e => {
                            reject(e)
                        });
                    }
                    // } else {
                    //     reject({
                    //         status: false,
                    //         msg: 'شما از قبل عضو تورنومنت شده اید'
                    //     })
                    // }

                }).catch(reject);
            } catch (e) {
                reject(e)
            }
        })
    }

    enterMultiPlayer(lang, id, userId, characterNames) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel();
            let walletModel = new WalletModel();
            let walletTransactionModel = new WalletTransactionsModel();
            try {
                pubgTournamentPlayerModel.fetch_one('*', ['user_id', 'tournament_id'], [userId, id]).then(async response => {

                    // if (!response) {
                    let tour = await pubgTournamentModel.fetch_one('*', ['id'], [id]);
                    let wallet = await walletModel.fetch_one('*', ['user_id'], [userId]);

                    if (tour.group_capacity >= characterNames.length) {

                        if (wallet.amount < (tour.fee * characterNames.length)) {
                            reject({
                                status: false,
                                msg: 'موجودی کافی نمی باشد'
                            })
                        } else {
                            walletTransactionModel.insertSync(
                                ['amount', 'type', 'wallet_id'],
                                [(tour.fee * characterNames.length), 'INCREASE', wallet.id]
                            ).then(data => {
                                let walletTransactionId = data.id;
                                walletModel.update(['amount'], [(wallet.amount - (tour.fee * characterNames.length)).toFixed(2)], ['id'], [wallet.id]).then(response => {

                                    // In below calculate group player and other options of new players of the tournament
                                    pubgTournamentPlayerModel.fetch_all_custom('SELECT * FROM pubg.v_players_registered_count').then(data => {
                                        let playersRegisteredCount = data.result[0].players_count;

                                        if (playersRegisteredCount) {
                                            if (tour.capacity - characterNames.length >= playersRegisteredCount) {
                                                pubgTournamentPlayerModel.fetch_all_custom('SELECT * FROM pubg.v_groups_count ORDER BY count').then(data => {
                                                    // Removing max groups from list because we want to add new user to tournament and it need group with empty capacity
                                                    // get max count of group numbers
                                                    let maxCount = Math.max.apply(Math, data.result.map(group => group.count));
                                                    // get max group number created to now
                                                    let maxGroupNumber = Math.max.apply(Math, data.result.map(group => group.group_number));
                                                    // If group numbers has fill group then
                                                    if (maxCount === tour.group_capacity) {
                                                        // Get index of max fill group
                                                        let index = data.result.findIndex(group => count === maxCount);
                                                        // Remove max groups from array of data
                                                        data.result.splice(
                                                            tour.group_capacity.findIndex(group => count === maxCount),
                                                            data.result.length - index
                                                        );

                                                        // If data has groups with capacity then
                                                        if (data.result.length > 0) {
                                                            // get max group and group number for add new user to it
                                                            maxCount = Math.max.apply(Math, data.result.map(group => group.count));
                                                            maxGroupNumber = data.result.find(group => group.count === maxCount).group_number;
                                                        }
                                                        // Else max group number increasing one step to create new group
                                                        else {
                                                            maxGroupNumber++;
                                                        }
                                                    }

                                                    pubgTournamentPlayerModel.insertSync(
                                                        ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                                                        [characterName, maxGroupNumber, walletTransactionId, id, userId]
                                                    ).then(response => {
                                                        resolve({status: true})
                                                    }).catch(e => {
                                                        reject({status: false})
                                                    });

                                                }).catch(e => {
                                                    reject(e)
                                                });
                                            } else {
                                                reject({status: true, msg: 'ظرفیت تکمیل است'})
                                            }
                                        } else {
                                            // Add first user(player) in the tournament
                                            pubgTournamentPlayerModel.insertSync(
                                                ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                                                [characterName, 1, walletTransactionId, id, userId]
                                            ).then(response => {
                                                resolve({status: true})
                                            }).catch(e => {
                                                reject({status: false})
                                            });
                                        }
                                    }).catch(e => {
                                        reject(e)
                                    });

                                }).catch(e => {
                                    reject(e)
                                });
                            }).catch(e => {
                                reject(e)
                            });
                        }

                    } else {
                        reject({
                            status: false,
                            msg: 'تعداد بازیکنان معرفی شده از سمت شما بیش از ظرفیت گروه تورنومنت می باشد'
                        })
                    }
                    // } else {
                    //     reject({
                    //         status: false,
                    //         msg: 'شما از قبل عضو تورنومنت شده اید'
                    //     })
                    // }

                }).catch(reject);
            } catch (e) {
                reject(e)
            }
        })
    }

    myTournaments(lang, userId, page = undefined, size = undefined) {
        return new Promise((resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            pubgTournamentModel.fetch_all_custom(`SELECT pubg.tournaments.id, pubg.tournaments.glossary_key_title as tournaments_glossary_key_title, pubg.tournaments.glossary_key_description as tournaments_glossary_key_description, pubg.tournaments.capacity, pubg.tournaments.start_date, pubg.tournaments.reward_value, pubg.tournaments.fee, pubg.tournaments.status, pubg.tournaments.youtube_link, pubg.tournaments.group_capacity, pubg.tournaments.username, pubg.tournaments.password, pubg.tournaments.map_id, pubg.maps.glossary_key_name as maps_glossary_key_name, pubg.maps.image_media_id as maps_image_media_id FROM pubg.tournaments LEFT JOIN pubg.maps ON (pubg.tournaments.map_id = pubg.maps.id) INNER JOIN pubg.tournament_players ON (pubg.tournaments.id = pubg.tournament_players.tournament_id) WHERE tournament_players.user_id = ${userId} ORDER BY pubg.tournaments.id DESC`, page, size).then(async data => {
                let result = [];

                for (let i = 0; i < data.result.length; i++) {
                    data.result[i].map = {};
                    data.result[i].map['name'] = lang ? await translate(data.result[i].maps_glossary_key_name, lang) : await getTranslates(data.result[i].maps_glossary_key_name);
                    data.result[i].map['image'] = await mediaGetFile(data.result[i].maps_image_media_id);

                    data.result[i].title = lang ? await translate(data.result[i].tournaments_glossary_key_title, lang) : await getTranslates(data.result[i].tournaments_glossary_key_title);
                    data.result[i].description = lang ? await translate(data.result[i].tournaments_glossary_key_description, lang) : await getTranslates(data.result[i].tournaments_glossary_key_description);

                    result.push(data.result[i])
                }
                resolve({
                    status: true,
                    result,
                    total: data.total,
                })
            }).catch(reject)
        })
    }
}

module.exports = Actions;
