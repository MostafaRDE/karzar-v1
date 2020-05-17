const {TotalAmountModel} = require("../../../Models/PaymentModel");
let {GatewayModel} = require('../../../Models/GatewayModel');
const mediaGetFile = require('../../../util/media').getFile;
const {microtime} = require('./../../../util/helper/functions');
const getTranslates = require('../../../util/glossary').getTranslates;
const translate = require('../../../util/glossary').translate;
const translateStore = require('../../../util/glossary').store;
const translateUpdate = require('../../../util/glossary').update;

class GatewaysActions {
    index(lang = null, type) {
        return new Promise((resolve, reject) => {
            let gatewayModel = new GatewayModel();
            gatewayModel.fetch_all_custom(`SELECT * FROM gateways WHERE type = '${type}' ORDER BY id`).then(async data => {
                for (let i = 0; i < data.result.length; i++)
                    if (data.result[i].image_media_id) {
                        data.result[i].key_1 = lang === null ? await getTranslates(data.result[i].glossary_key_key_1) : await translate(data.result[i].glossary_key_key_1, lang);
                        data.result[i].key_2 = lang === null ? await getTranslates(data.result[i].glossary_key_key_2) : await translate(data.result[i].glossary_key_key_2, lang);
                        data.result[i].image = await mediaGetFile(data.result[i].image_media_id);
                    }
                resolve(data)
            }).catch(reject)
        });
    }

    store(name, key1, key2, mediaId, type) {
        return new Promise(async (resolve, reject) => {
            let gatewayModel = new GatewayModel();
            let totalAmountModel = new TotalAmountModel();
            try {
                const translateKey1 = `gateway_key_1_${microtime()}`;
                const translateKey2 = `gateway_key_2_${microtime()}`;
                let keys = ['name', 'glossary_key_key_1', 'glossary_key_key_2', 'type'];
                let values = [name, translateKey1, translateKey2, type];
                if (mediaId) {
                    keys.push('image_media_id');
                    values.push(mediaId);
                }

                let gateway = await gatewayModel.insertSync(keys, values);
                await totalAmountModel.insertSync(['account_name', 'gateway_id'], [name, gateway.id]);

                let languages = Object.keys(key1);
                for (let i = 0; i < languages.length; i++)
                    await translateStore(translateKey1, key1[languages[i]], languages[i]);

                languages = Object.keys(key2);
                for (let i = 0; i < languages.length; i++)
                    await translateStore(translateKey2, key2[languages[i]], languages[i]);

                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        });
    }

    update(id, name, key1, key2, type, mediaId = undefined) {
        return new Promise(async (resolve, reject) => {
            let gatewayModel = new GatewayModel();

            try {
                let keys = ['name', 'type'];
                let values = [name, type];
                if (mediaId) {
                    keys.push('image_media_id');
                    values.push(mediaId);
                }

                gatewayModel.update(keys, values, ['id'], [id], undefined, 'glossary_key_key_1, glossary_key_key_2').then(async data => {

                    let languages = Object.keys(key1);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_key_1, key1[languages[i]], languages[i]);

                    languages = Object.keys(key2);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_key_2, key2[languages[i]], languages[i]);

                    resolve({status: true})

                });
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = GatewaysActions;
