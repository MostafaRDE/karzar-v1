let {PubgTournamentModel, PubgTournamentPlayerModel} = require('../../../Models/PubgModel');
let {WalletModel, WalletTransactionsModel} = require('../../../Models/WalletModel');
const mediaGetFile = require('../../../util/media').getFile;
const getTranslates = require('../../../util/glossary').getTranslates;
const translate = require('../../../util/glossary').translate;

class Actions {
    index(lang, page = undefined, size = undefined) {
        return new Promise((resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            pubgTournamentModel.fetch_all_custom(`SELECT * FROM pubg.v_tournaments`, page, size).then(async data => {
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
            }).catch(error => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
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
            }).catch(error => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        })
    }

    runningTournaments(lang, isLogged = false) {
        return new Promise((resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            let table = `v_tournaments${isLogged ? '' : '_without_authentication'}`;
            let query = `SELECT * FROM pubg.${table} ORDER BY ${table}.id DESC`;

            pubgTournamentModel.fetch_all_custom(query, 1, 1).then(async data => {
                for (let i = 0; i < data.result.length; i++) {
                    data.result[i].map = {};
                    data.result[i].map['name'] = lang ? await translate(data.result[i].maps_glossary_key_name, lang) : await getTranslates(data.result[i].maps_glossary_key_name);
                    data.result[i].map['image'] = await mediaGetFile(data.result[i].maps_image_media_id);

                    data.result[i].title = lang ? await translate(data.result[i].tournaments_glossary_key_title, lang) : await getTranslates(data.result[i].tournaments_glossary_key_title);
                    data.result[i].description = lang ? await translate(data.result[i].tournaments_glossary_key_description, lang) : await getTranslates(data.result[i].tournaments_glossary_key_description);
                }

                resolve(data)
            }).catch(error => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        })
    }

    players(lang, id) {
        return new Promise((resolve, reject) => {
            let model = new PubgTournamentPlayerModel();
            model.fetch_all_custom(`SELECT pubg.tournament_players.*, users.media_id as profile_image_id FROM pubg.tournament_players INNER JOIN users ON (tournament_players.user_id = users.id) WHERE tournament_id = ${id} ORDER BY group_number, character_name`)
                .then(resolve)
                .catch(error => {
                    reject({
                        status: false,
                        msg: __('messages').internal_server_error
                    })
                })
        })
    }

    enter(lang, id, userId, characterName) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel();
            let walletModel = new WalletModel();
            let walletTransactionModel = new WalletTransactionsModel();
            try {
                pubgTournamentPlayerModel.fetch_one('*', ['character_name', 'tournament_id'], [characterName, id]).then(async response => {

                    if (!response) {
                        let tour = await pubgTournamentModel.fetch_one('*', ['id'], [id]);
                        let wallet = await walletModel.fetch_one('*', ['user_id'], [userId]);

                        if (wallet.amount < tour.fee) {
                            reject({
                                status: false,
                                msg: __('messages').not_enough_amount
                            })
                        } else {
                            walletTransactionModel.insertSync(
                                ['amount', 'type', 'wallet_id', 'in_order_to'],
                                [tour.fee, 'INCREASE', wallet.id, 'INPUT_IN_TOURNAMENT']
                            ).then(data => {
                                let walletTransactionId = data.id;
                                walletModel.update(['amount'], [(wallet.amount - tour.fee).toFixed(2)], ['id'], [wallet.id]).then(response => {

                                    // In below calculate group player and other options of new player of the tournament
                                    pubgTournamentPlayerModel.fetch_all_custom(`SELECT * FROM pubg.v_players_registered_count WHERE tournament_id = '${id}'`).then(data => {
                                        let playersRegisteredCount = data.result[0].players_count;

                                        if (playersRegisteredCount) {
                                            if (tour.capacity > playersRegisteredCount) {
                                                pubgTournamentPlayerModel.fetch_all_custom(`SELECT * FROM pubg.v_groups_count WHERE tournament_id = '${id}' ORDER BY count, group_number`).then(data => {
                                                    // Removing max groups from list because we want to add new user to tournament and it need group with empty capacity
                                                    // get max count of group numbers
                                                    let maxCount = Math.max.apply(Math, data.result.map(group => group.count));
                                                    // get max group number created to now
                                                    let groupNumber = Math.max.apply(Math, data.result.map(group => group.group_number));

                                                    // If group numbers has fill group then
                                                    if (maxCount === tour.group_capacity) {
                                                        // Get index of max fill group
                                                        let index = data.result.findIndex(group => group.count == maxCount);
                                                        // Remove max groups from array of data
                                                        data.result.splice(
                                                            index,
                                                            data.result.length - index
                                                        );

                                                        // If data has groups with capacity then
                                                        if (data.result.length > 0) {
                                                            // get max group and group number for add new user to it
                                                            maxCount = Math.max.apply(Math, data.result.map(group => group.count));
                                                            groupNumber = data.result.find(group => group.count == maxCount).group_number;
                                                        }
                                                        // Else max group number increasing one step to create new group
                                                        else {
                                                            groupNumber++;
                                                        }
                                                    } else {
                                                        groupNumber = data.result.find(group => group.count == maxCount).group_number;
                                                    }

                                                    pubgTournamentPlayerModel.insertSync(
                                                        ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                                                        [characterName, groupNumber, walletTransactionId, id, userId]
                                                    ).then(response => {
                                                        resolve({status: true})
                                                    }).catch(e => {
                                                        reject({
                                                            status: false,
                                                            msg: __('messages').internal_server_error
                                                        })
                                                    });

                                                }).catch(e => {
                                                    reject({
                                                        status: false,
                                                        msg: __('messages').internal_server_error
                                                    })
                                                });
                                            } else {
                                                reject({status: true, msg: __('messages').tournament_capacity_is_filled})
                                            }
                                        } else {
                                            // Add first user(player) in the tournament
                                            pubgTournamentPlayerModel.insertSync(
                                                ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                                                [characterName, 1, walletTransactionId, id, userId]
                                            ).then(response => {
                                                resolve({status: true})
                                            }).catch(e => {
                                                reject({
                                                    status: false,
                                                    msg: __('messages').internal_server_error
                                                })
                                            });
                                        }
                                    }).catch(e => {
                                        reject({
                                            status: false,
                                            msg: __('messages').internal_server_error
                                        })
                                    });

                                }).catch(e => {
                                    reject({
                                        status: false,
                                        msg: __('messages').internal_server_error
                                    })
                                });
                            }).catch(e => {
                                reject({
                                    status: false,
                                    msg: __('messages').internal_server_error
                                })
                            });
                        }
                    } else {
                        reject({
                            status: false,
                            msg: __('messages').you_are_already_a_member_of_the_tournament
                        })
                    }

                }).catch(reject);
            } catch (e) {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
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

                let tempCharacterNames = [];
                characterNames.forEach(characterName => tempCharacterNames.push(characterName));

                for (let i = 0; i < tempCharacterNames.length; i++) {
                    try {
                        let response = await pubgTournamentPlayerModel.fetch_one('*', ['character_name', 'tournament_id'], [tempCharacterNames[i], id]);
                        if (response) {
                            let index = characterNames.indexOf(tempCharacterNames[i]);
                            if (index > -1) {
                                characterNames.splice(index, 1)
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }

                if (characterNames.length) {

                    let tour = await pubgTournamentModel.fetch_one('*', ['id'], [id]);
                    let wallet = await walletModel.fetch_one('*', ['user_id'], [userId]);

                    if (tour.group_capacity >= characterNames.length) {

                        // In below calculate capacity for registering
                        pubgTournamentPlayerModel.fetch_all_custom('SELECT * FROM pubg.v_players_registered_count').then(data => {
                            let playersRegisteredCount = data.result[0].players_count;

                            if (!playersRegisteredCount || tour.capacity - characterNames.length >= playersRegisteredCount) {

                                // In below calculate payment
                                if (wallet.amount < (tour.fee * characterNames.length)) {
                                    reject({
                                        status: false,
                                        msg: __('messages').not_enough_amount
                                    })
                                } else {
                                    // Set transaction wallet
                                    walletTransactionModel.insertSync(
                                        ['amount', 'type', 'wallet_id', 'in_order_to'],
                                        [(tour.fee * characterNames.length), 'INCREASE', wallet.id, 'INPUT_IN_TOURNAMENT']
                                    ).then(data => {
                                        let walletTransactionId = data.id;
                                        // Decrease amount of user(player) wallet
                                        walletModel.update(['amount'], [(wallet.amount - (tour.fee * characterNames.length)).toFixed(2)], ['id'], [wallet.id]).then(response => {

                                            // In below calculate group player and other options of new players of the tournament

                                            if (playersRegisteredCount) {
                                                pubgTournamentPlayerModel.fetch_all_custom('SELECT * FROM pubg.v_groups_count ORDER BY count DESC, group_number').then(data => {

                                                    // get max group number created to now
                                                    let groupNumber = Math.max.apply(Math, data.result.map(group => group.group_number)),
                                                        // Max allow members registered in a group and new team add side by the old group (Merge team)
                                                        maxAllowGroupMembersForNewPlayers = tour.group_capacity - characterNames.length;
                                                    // If new team not filling group
                                                    if (maxAllowGroupMembersForNewPlayers > 0) {
                                                        // If exist a group with capacity for new team
                                                        let groupIndexAllowCanNewGroupMergeWithIt = data.result.find(group => group.count <= maxAllowGroupMembersForNewPlayers);
                                                        if (groupIndexAllowCanNewGroupMergeWithIt)
                                                            groupNumber = groupIndexAllowCanNewGroupMergeWithIt.group_number;
                                                        else
                                                            groupNumber++;
                                                    } else {
                                                        groupNumber++;
                                                    }

                                                    this.enterUser(characterNames, groupNumber, walletTransactionId, id, userId).then(resolve).catch(reject)

                                                }).catch(e => {
                                                    reject({
                                                        status: false,
                                                        msg: __('messages').internal_server_error
                                                    })
                                                });
                                            } else {
                                                // Add first user(player) or team in the tournament
                                                this.enterUser(characterNames, 1, walletTransactionId, id, userId).then(resolve).catch(reject);
                                            }
                                        }).catch(e => {
                                            reject({
                                                status: false,
                                                msg: __('messages').internal_server_error
                                            })
                                        });
                                    }).catch(e => {
                                        reject({
                                            status: false,
                                            msg: __('messages').internal_server_error
                                        })
                                    });
                                }

                            } else {
                                reject({
                                    status: false,
                                    msg: __('messages').tournament_capacity_is_filled
                                })
                            }
                        });
                    } else {
                        reject({
                            status: false,
                            msg: __('messages').internal_server_error
                        })
                        reject({
                            status: false,
                            msg: __('messages').the_number_of_players_represented_by_you_is_higher_than_the_capacity_of_the_tournament_group
                        })
                    }

                } else {
                    reject({
                        status: false,
                        msg: __('messages').introduced_players_are_already_registered
                    })
                }


            } catch (e) {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
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
            }).catch(error => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        })
    }

    // -----------------------------------------------------

    enterUser(characterNames, groupNumber, walletTransactionId, tournamentId, userId) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel(),
                i = 0;


            for (let j = 0; j < characterNames.length; j++) {
                try {
                    await pubgTournamentPlayerModel.insertSync(
                        ['character_name', 'group_number', 'wallet_transaction_id', 'tournament_id', 'user_id'],
                        [characterNames[j], groupNumber, walletTransactionId, tournamentId, userId]
                    );

                    i++
                } catch (e) {
                    console.log(e)
                }
            }


            // If registered all new users
            if (i === characterNames.length) {
                resolve({status: true})
            }
            // Else if i > 0 and not registered all new characters
            else if (i) {
                reject({
                    status: false,
                    msg: __('messages').there_is_a_disturbance_in_the_player_registration_process_unfortunately_some_players_are_not_registered_please_notify_via_ticket
                })
            }
            // Else registering characters failed
            else {
                reject({
                    status: false,
                    msg: __('messages').there_was_an_error_registering_players_and_the_registration_failed_please_notify_via_ticket
                })
            }
        })
    }
}

module.exports = Actions;
