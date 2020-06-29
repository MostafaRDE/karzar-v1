const {PubgMapModel} = require('./../../../../../Models/PubgModel');
const mediaGetFile = require('../../../../../util/media').getFile;
const {microtime} = require('./../../../../../util/helper/functions');
const getTranslates = require('../../../../../util/glossary').getTranslates;
const translate = require('../../../../../util/glossary').translate;
const translateStore = require('../../../../../util/glossary').store;
const translateUpdate = require('../../../../../util/glossary').update;

class PubgMapActions {
    index(lang = null) {
        return new Promise((resolve, reject) => {
            let pubgMapModel = new PubgMapModel();
            pubgMapModel.fetch_all('*').then(async data => {
                let response = {
                    result: [],
                    total: data.total,
                };

                for (let i = 0; i < data.total; i++)
                    response.result[i] = {
                        id: data.result[i].id,
                        name: lang === null ? await getTranslates(data.result[i].gk_name) : await translate(data.result[i].gk_name, lang),
                        image: await mediaGetFile(data.result[i].image_media_id),
                    };

                resolve(response)
            }).catch(reject)
        })
    }

    store(mediaId, names) {
        return new Promise(async (resolve, reject) => {
            let pubgMapModel = new PubgMapModel();
            try {
                const translateKey = `pubg_maps_name_${microtime()}`;
                await pubgMapModel.insertSync(['gk_name', 'image_media_id'], [translateKey, mediaId]);

                const languages = Object.keys(names);
                for (let i = 0; i < languages.length; i++) {
                    await translateStore(translateKey, names[languages[i]], languages[i])
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
            pubgMapModel.fetch_one('*', ['id'], [id]).then(async data => {
                resolve({
                    id: data.id,
                    gk_name: data.gk_name,
                    name: lang === null ? await getTranslates(data.gk_name) : await translate(data.gk_name, lang),
                    image: await mediaGetFile(data.image_media_id),
                })
            }).catch(reject)
        })
    }

    update(id, mediaId, names, lang = null) {
        return new Promise(async (resolve, reject) => {
            let map = await this.show(id);
            const languages = Object.keys(names);

            let pubgMapModel = new PubgMapModel();
            if (mediaId > 0) {
                pubgMapModel.update(['image_media_id'], [mediaId], ['id'], [id]).then(async data => {
                    try {
                        for (let i = 0; i < languages.length; i++)
                            await translateUpdate(map.gk_name, names[languages[i]], languages[i]);
                    } catch (e) {
                        reject(e)
                    }
                    this.show(data.id, lang).then(res => resolve(res)).catch(reject)
                }).catch(reject)
            } else {
                try {
                    for (let i = 0; i < languages.length; i++) {
                        await translateUpdate(map.gk_name, names[languages[i]], languages[i]);
                    }
                    this.show(id, lang).then(res => resolve(res)).catch(reject)
                } catch (e) {
                    reject(e)
                }
            }
        })
    }

    destroy(id) {
        return new Promise(async (resolve, reject) => {
            let userModel = new PubgMapModel();
            try {
                await userModel.delete(['id'], [id]);
                resolve({status: true});
            } catch (e) {
                reject(e)
            }
        });
    }
}

module.exports = PubgMapActions;
