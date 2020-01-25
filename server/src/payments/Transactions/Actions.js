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
                    reject({
                        status: false,
                        msg: __('messages').interval_server_error
                    });
                }
                resolve(data)
            }).catch(error => {
                console.log(error);
                reject({
                    status: false,
                    msg: __('messages').interval_server_error
                });
            })
        })
    }

    store(userId, ip, amount, description, gatewayId, inOrderTo, type, mediaId, dataField) {
        return new Promise((resolve, reject) => {
            let transactionModel = new TransactionModel();
            let walletModel = new WalletModel();
            transactionModel.fetch_all_custom(`SELECT created_at FROM transactions WHERE created_at > NOW() - INTERVAL '15 minutes' AND type = '${type}'`).then(data => {

                if (data.result.length) {
                    reject({
                        status: false,
                        msg: __('messages').please_re_register_15_minute_after_your_last_transaction_was_re_registered,
                    })
                } else {

                    walletModel.fetch_one('*', ['user_id'], [userId]).then(wallet => {
                        let keys = ['amount', 'description', 'gateway_id', 'in_order_to', 'type', 'ip', 'wallet_id', 'user_id', 'data'],
                            values = [amount, description, gatewayId, inOrderTo, type, ip, wallet.id, userId, dataField];
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
                        console.log(error);
                        reject({
                            status: false,
                            msg: __('messages').interval_server_error
                        });
                    });

                }

            }).catch(error => {
                console.log(error);
                reject({
                    status: false,
                    msg: __('messages').interval_server_error
                });
            });
        })
    }
}

module.exports = Actions;
