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
                    ).then(response => {
                        walletModel.update(['amount'], [wallet.amount - tour.fee], ['id'], [wallet.id]).then(response => {
                            pubgTournamentPlayerModel.insertSync([], []).then(response => {

                                // In below calculate group player and other options of new player of the tournament

                                resolve({status: true})
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
