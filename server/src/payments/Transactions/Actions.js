const {GatewayModel} = require("../../../Models/GatewayModel");
const {TransactionModel} = require("../../../Models/PaymentModel");
const {WalletModel} = require("../../../Models/WalletModel");
const translate = require('../../../util/glossary').translate;

class Actions {
    index(lang, userId, page, size) {
        return new Promise((resolve, reject) => {
            let model = new TransactionModel();
            model.fetch_all('*', ['user_id'], [userId], undefined, undefined, page, size, 'id').then(async data => {
                let gatewayModel = new GatewayModel();
                try {
                    for (let i = 0; i < data.result.length; i++) {
                        data.result[i].gateway = await gatewayModel.fetch_one('*', ['id'], [data.result[i].gateway_id]);
                        data.result[i].gateway.key1 = await translate(data.result[i].gateway.glossary_key_key_1, lang);
                        data.result[i].gateway.key2 = await translate(data.result[i].gateway.glossary_key_key_2, lang);
                    }
                } catch (e) {
                    console.log(e);
                    reject(e)
                }
                resolve(data)
            }).catch(reject)
        })
    }

    store(userId, ip, amount, description, gatewayId, inOrderTo, type, mediaId) {
        console.log(userId, ip, amount, description, gatewayId, inOrderTo, type, mediaId)
        return new Promise((resolve, reject) => {
            let transactionModel = new TransactionModel();
            let walletModel = new WalletModel();
            walletModel.fetch_one('*', ['user_id'], [userId]).then(wallet => {
                let keys = ['amount', 'description', 'gateway_id', 'in_order_to', 'type', 'ip', 'wallet_id', 'user_id'],
                    values = [amount, description, gatewayId, inOrderTo, type, ip, wallet.id, userId];
                if (mediaId) {
                    keys.push('attachment_media_id');
                    values.push(mediaId);
                }
                transactionModel.insertSync(keys, values).then(res => {
                    resolve({status: true})
                }).catch(error => {
                    console.log(error);
                    reject({
                        status: false,
                        msg: __('messages').internal_server_error
                    })
                });
            }).catch(error => {
                reject(error)
            });
        })
    }
}

module.exports = Actions;
