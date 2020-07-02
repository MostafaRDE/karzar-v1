const {TransactionModel} = require('../../../Models/PaymentModel');
const {WalletModel} = require('../../../Models/WalletModel');

class Actions {
    chargeWallet(userId, trackId, amount) {
        return new Promise((resolve, reject) => {
            const transactionModel = new TransactionModel();
            const walletModel = new WalletModel();
            walletModel.fetch_one('*', ['user_id'], [userId]).then(wallet => {
                transactionModel.update(['paid_at', 'status'], ['now()', '1'], ['track_id'], [trackId]).then(result => {
                    walletModel.update(['amount'], [parseInt(wallet.amount) + parseInt(amount)], ['user_id'], [userId]).then(response => {
                        resolve({status: true})
                    }).catch(error => {
                        console.log(error);
                        reject({status: false})
                    })
                }).catch(error => {
                    console.log(error);
                    reject({status: false})
                })
            }).catch(error => {
                console.log(error);
                reject({status: false})
            })
        })
    }
}

module.exports = Actions;
