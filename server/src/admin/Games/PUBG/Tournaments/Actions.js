const {PubgMapModel, PubgTournamentModel, PubgTournamentPlayerModel} = require('./../../../../../Models/PubgModel');
const mediaGetFile = require('../../../../../util/media').getFile;
const getTranslates = require('../../../../../util/glossary').getTranslates;
const translate = require('../../../../../util/glossary').translate;
const translateStore = require('../../../../../util/glossary').store;
const translateUpdate = require('../../../../../util/glossary').update;
const {microtime} = require('./../../../../../util/helper/functions');

class PubgTournamentsActions {
    index(lang = null, search = undefined, page = undefined, size = undefined) {
        return new Promise((resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            let query = 'SELECT pubg.tournaments.id, pubg.tournaments.glossary_key_title as tournaments_glossary_key_title, pubg.tournaments.glossary_key_description as tournaments_glossary_key_description, pubg.tournaments.capacity, pubg.tournaments.start_date, pubg.tournaments.reward_value, pubg.tournaments.fee, pubg.tournaments.status, pubg.tournaments.youtube_link, pubg.tournaments.group_capacity, pubg.tournaments.username, pubg.tournaments.password, pubg.tournaments.map_id, pubg.maps.glossary_key_name as maps_glossary_key_name, pubg.maps.image_media_id as maps_image_media_id FROM pubg.tournaments ';
            let leftJoinQuery = ' LEFT JOIN pubg.maps ON (pubg.tournaments.map_id = pubg.maps.id) ';
            let searchQuery = '';
            let orderQuery = ' ORDER BY pubg.tournaments.id DESC ';
            if (search) {
                let fee = '';
                if (!isNaN(search))
                    fee = ` OR pubg.tournaments.fee = '${search}' `;
                searchQuery = ` WHERE pubg.tournaments.reward_value ILIKE '%${search}%' OR pubg.tournaments.youtube_link ILIKE '%${search}%' ${fee} `
            }

            pubgTournamentModel.fetch_all_custom(`${query} ${leftJoinQuery} ${searchQuery} ${orderQuery}`, page, size).then(async data => {
                let result = [];

                for (let i = 0; i < data.result.length; i++) {
                    let map = {};
                    map['name'] = await getTranslates(data.result[i].maps_glossary_key_name);
                    map['image'] = await mediaGetFile(data.result[i].maps_image_media_id);

                    data.result[i].title = await getTranslates(data.result[i].tournaments_glossary_key_title);
                    data.result[i].description = await getTranslates(data.result[i].tournaments_glossary_key_description);
                    data.result[i].map = map;

                    if (search) {
                        let status = false;

                        let titleKeys = Object.keys(data.result[i].title);
                        for (let i = 0; i < titleKeys.length; i++) {
                            if (data.result[i].title[titleKeys[i]].search(new RegExp(search, "i"))) {
                                status = true;
                                break;
                            }
                        }

                        if (!status) {
                            let mapNameKeys = Object.keys(map['name']);
                            for (let i = 0; i < mapNameKeys.length; i++) {
                                if (map['name'][mapNameKeys[i]].search(new RegExp(search, "i"))) {
                                    status = true;
                                    break;
                                }
                            }
                        }

                        if (status)
                            result.push(data.result[i])
                    } else {
                        result.push(data.result[i])
                    }
                }
                resolve({
                    status: true,
                    result,
                    total: data.total,
                })
            }).catch(reject)
        })
    }

    store(titles, descriptions, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity = 4) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();
            try {
                const translateKeyTitle = `pubg_tournaments_title_${microtime()}`,
                    translateKeyDescription = `pubg_tournaments_description_${microtime()}`;
                await pubgTournamentModel.insertSync(
                    ['glossary_key_title', 'glossary_key_description', 'capacity', 'start_date', 'reward_value', 'fee', 'status', 'youtube_link', 'map_id', 'group_capacity'],
                    [translateKeyTitle, translateKeyDescription, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity]
                );

                const languagesTitles = Object.keys(titles);
                for (let i = 0; i < languagesTitles.length; i++) {
                    await translateStore(translateKeyTitle, titles[languagesTitles[i]], languagesTitles[i])
                }

                const languagesDescriptions = Object.keys(descriptions);
                for (let i = 0; i < languagesDescriptions.length; i++) {
                    await translateStore(translateKeyDescription, descriptions[languagesDescriptions[i]], languagesDescriptions[i])
                }

                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        })
    }

    show(id, lang = null) {
        return new Promise((resolve, reject) => {
            let pubgMapModel = new PubgMapModel();
            let pubgTournamentModel = new PubgTournamentModel();
            pubgTournamentModel.fetch_one('*', ['id'], [id]).then(async data => {
                let map = await pubgMapModel.fetch_one('*', ['id'], [data.map_id]);
                map['image'] = await mediaGetFile(map.image_media_id);
                data.title = lang === null ? await getTranslates(data.glossary_key_title) : await translate(data.glossary_key_title, lang);
                data.description = lang === null ? await getTranslates(data.glossary_key_description) : await translate(data.glossary_key_description, lang);
                data.map = map;
                resolve(data)
            }).catch(reject)
        })
    }

    update(id, titles, descriptions, capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity = 4, lang = null) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();

            let tournament = await this.show(id);

            pubgTournamentModel.update(
                ['capacity', 'start_date', 'reward_value', 'fee', 'status', 'youtube_link', 'map_id', 'group_capacity'],
                [capacity, startDate, rewardValue, fee, status, youtubeLink, mapId, groupCapacity],
                ['id'], [id]).then(async data => {
                try {
                    const languagesTitles = Object.keys(titles);
                    for (let i = 0; i < languagesTitles.length; i++)
                        await translateUpdate(tournament.glossary_key_title, titles[languagesTitles[i]], languagesTitles[i]);

                    const languagesDescriptions = Object.keys(descriptions);
                    for (let i = 0; i < languagesDescriptions.length; i++)
                        await translateUpdate(tournament.glossary_key_description, descriptions[languagesDescriptions[i]], languagesDescriptions[i]);

                    this.show(data.id, lang).then(res => resolve(res)).catch(reject)
                } catch (e) {
                    reject(e)
                }
            }).catch(reject);
        });
    }

    players(id) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel();
            pubgTournamentPlayerModel.fetch_all_custom(`SELECT *, pubg.tournament_players.id as player_id FROM pubg.tournament_players INNER JOIN users ON (pubg.tournament_players.user_id = users.id) WHERE tournament_players.tournament_id = ${id}`).then(data => {
                resolve(data)
            }).catch(reject)
        });
    }

    addAuthenticationRoomToGroupPlayers(player_id) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel();

            pubgTournamentPlayerModel.update(['is_authentication_room_get'], [true], ['id'], [player_id]).then(data => {
                resolve({status: true})
            }).catch(reject)
        })
    }

    removeAuthenticationRoomToGroupPlayers(player_id) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentPlayerModel = new PubgTournamentPlayerModel();

            pubgTournamentPlayerModel.update(['is_authentication_room_get'], [false], ['id'], [player_id]).then(data => {
                resolve({status: true})
            }).catch(reject)
        })
    }

    destroy(id) {
        return new Promise(async (resolve, reject) => {
            let pubgTournamentModel = new PubgTournamentModel();
            try {
                await pubgTournamentModel.delete(['id'], [id]);
                resolve({status: true});
            } catch (e) {
                reject(e)
            }
        });
    }
}

module.exports = PubgTournamentsActions;
