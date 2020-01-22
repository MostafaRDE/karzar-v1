const {GatewayModel} = require("../../../Models/GatewayModel");
const {TransactionModel} = require("../../../Models/PaymentModel");
const {WalletModel} = require("../../../Models/WalletModel");

class Actions {
    index(userId, page, size) {
        return new Promise((resolve, reject) => {
            let model = new TransactionModel();
            model.fetch_all('*', ['user_id'], [userId], undefined, undefined, page, size, 'id').then(async data => {
                let gatewayModel = new GatewayModel();
                try {
                    for (let i = 0; i < data.result.length; i++)
                        data.result[i].gateway = await gatewayModel.fetch_one('*', ['id'], [data.result[i].gateway_id]);
                } catch (e) {
                    reject(e)
                }
                resolve(data)
            }).catch(reject)
        })
    }

    store(userId, ip, amount, description, gatewayId, inOrderTo, type) {
        return new Promise((resolve, reject) => {
            let transactionModel = new TransactionModel();
            let walletModel = new WalletModel();
            walletModel.fetch_one('*', ['user_id'], [userId]).then(wallet => {
                transactionModel.insertSync(['amount', 'description', 'gateway_id', 'in_order_to', 'type', 'ip', 'wallet_id', 'user_id'], [amount, description, gatewayId, inOrderTo, type, ip, wallet.id, userId]).then(res => {
                    resolve({status: true})
                }).catch(error => {
                    reject({status: false})
                });
            }).catch(error => {
                reject(error)
            });
        })
    }
}

module.exports = Actions;
