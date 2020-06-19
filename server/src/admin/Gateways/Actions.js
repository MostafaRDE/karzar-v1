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

            let whereKeys = [], whereValues = [];

            if (type === 'deposit') {
                whereKeys.push('is_deposit');
                whereValues.push('true');
            } else if (type === 'withdrawal') {
                whereKeys.push('is_withdrawal');
                whereValues.push('true');
            }

            gatewayModel.fetch_all('*', whereKeys.length ? whereKeys : undefined, whereValues ? whereValues : undefined, undefined, undefined, undefined, undefined, 'id').then(async data => {
                for (let i = 0; i < data.result.length; i++)
                    if (data.result[i].image_media_id) {
                        data.result[i].key_1_deposit = lang === null ? await getTranslates(data.result[i].glossary_key_key_1_deposit) : await translate(data.result[i].glossary_key_key_1_deposit, lang);
                        data.result[i].key_2_deposit = lang === null ? await getTranslates(data.result[i].glossary_key_key_2_deposit) : await translate(data.result[i].glossary_key_key_2_deposit, lang);
                        data.result[i].key_1_withdrawal = lang === null ? await getTranslates(data.result[i].glossary_key_key_1_withdrawal) : await translate(data.result[i].glossary_key_key_1_withdrawal, lang);
                        data.result[i].key_2_withdrawal = lang === null ? await getTranslates(data.result[i].glossary_key_key_2_withdrawal) : await translate(data.result[i].glossary_key_key_2_withdrawal, lang);
                        data.result[i].image = await mediaGetFile(data.result[i].image_media_id);
                    }
                resolve(data)
            }).catch(reject)
        });
    }

    store(name, isActive, isDeposit, isWithdrawal, key1Deposit, key2Deposit, key1Withdrawal, key2Withdrawal, mediaId) {
        return new Promise(async (resolve, reject) => {
            let gatewayModel = new GatewayModel();
            let totalAmountModel = new TotalAmountModel();
            try {
                const translateKey1Deposit = `gateway_key_1_deposit_${microtime()}`;
                const translateKey2Deposit = `gateway_key_2_deposit_${microtime()}`;
                const translateKey1Withdrawal = `gateway_key_1_withdrawal_${microtime()}`;
                const translateKey2Withdrawal = `gateway_key_2_withdrawal_${microtime()}`;
                let keys = ['name', 'is_active', 'is_deposit', 'is_withdrawal', 'glossary_key_key_1_deposit', 'glossary_key_key_2_deposit', 'glossary_key_key_1_withdrawal', 'glossary_key_key_2_withdrawal'];
                let values = [name, isActive, isDeposit, isWithdrawal, key1Deposit, key2Deposit, key1Withdrawal, key2Withdrawal];
                if (mediaId) {
                    keys.push('image_media_id');
                    values.push(mediaId);
                }

                let gateway = await gatewayModel.insertSync(keys, values);
                await totalAmountModel.insertSync(['account_name', 'gateway_id'], [name, gateway.id]);

                let languages = Object.keys(key1Deposit);
                for (let i = 0; i < languages.length; i++)
                    await translateStore(translateKey1Deposit, key1Deposit[languages[i]], languages[i]);

                languages = Object.keys(key2Deposit);
                for (let i = 0; i < languages.length; i++)
                    await translateStore(translateKey2Deposit, key2Deposit[languages[i]], languages[i]);

                languages = Object.keys(key1Withdrawal);
                for (let i = 0; i < languages.length; i++)
                    await translateStore(translateKey1Withdrawal, key1Withdrawal[languages[i]], languages[i]);

                languages = Object.keys(key2Withdrawal);
                for (let i = 0; i < languages.length; i++)
                    await translateStore(translateKey2Withdrawal, key2Withdrawal[languages[i]], languages[i]);

                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        });
    }

    update(id, name, isActive, isDeposit, isWithdrawal, key1Deposit, key2Deposit, key1Withdrawal, key2Withdrawal, mediaId = undefined) {
        return new Promise(async (resolve, reject) => {
            let gatewayModel = new GatewayModel();

            try {
                let keys = ['name', 'is_active', 'is_deposit', 'is_withdrawal'];
                let values = [name, isActive, isDeposit, isWithdrawal];
                if (mediaId) {
                    keys.push('image_media_id');
                    values.push(mediaId);
                }

                gatewayModel.update(keys, values, ['id'], [id], undefined, 'glossary_key_key_1, glossary_key_key_2').then(async data => {

                    let languages = Object.keys(key1Deposit);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_key_1_deposit, key1Deposit[languages[i]], languages[i]);

                    languages = Object.keys(key1Deposit);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_key_2_deposit, key2Deposit[languages[i]], languages[i]);

                    languages = Object.keys(key1Withdrawal);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_key_1_withdrawal, key1Withdrawal[languages[i]], languages[i]);

                    languages = Object.keys(key2Withdrawal);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_key_2_withdrawal, key2Withdrawal[languages[i]], languages[i]);

                    resolve({status: true})

                });
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = GatewaysActions;
