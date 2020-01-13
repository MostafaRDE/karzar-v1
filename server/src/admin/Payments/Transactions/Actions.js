const {TotalAmountModel, TransactionModel} = require("../../../../Models/PaymentModel")

class TransactionsAction {
    index() {
        return new Promise((resolve, reject) => {
            let model = new TransactionModel();
            model.fetch_all_custom('SELECT * FROM v_transactions_users').then(async data => {
                resolve(data)
            }).catch(reject)
        })
    }

    store(amount, description, gateway, ip, inOrderTo, type, walletId) {
        return new Promise(async (resolve, reject) => {
            let model = new TransactionModel();
            try {
                await model.insertSync(['amount', 'description', 'gateway', 'ip', 'in_order_to', 'type', 'wallet_id'], [amount, description, gateway, ip, inOrderTo, type, walletId]);
                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        });
    }

    show(id) {
        return new Promise((resolve, reject) => {
            let model = new TransactionModel();
            model.fetch_one('*', ['id'], [id]).then(async data => {
                resolve(data)
            }).catch(reject)
        })
    }

    update(id, amount, description, gateway, ip, inOrderTo, type, walletId) {
        return new Promise(async (resolve, reject) => {
            let model = new TransactionModel();
            model.update(['amount', 'description', 'gateway', 'ip', 'in_order_to', 'type', 'wallet_id'], [amount, description, gateway, ip, inOrderTo, type, walletId], ['id'], [id]).then(data => {
                resolve({status: true})
            }).catch(error => {
                reject(error)
            })
        });
    }

    updateStatus(id, status, statusDescription) {
        return new Promise((resolve, reject) => {
            let model = new TransactionModel();
            model.update(['status', 'status_description'], [status, statusDescription], ['id'], [id], 'id, amount, gateway_id').then(async data => {
                try {
                    if (status === 1) {
                        let totalAmountModel = new TotalAmountModel();
                        let totalAmount = await totalAmountModel.fetch_one('*', ['gateway_id'], [data.gateway_id]);
                        totalAmountModel.update(['amount'], [(totalAmount.amount + parseFloat(data.amount)).toFixed(2)], ['gateway_id'], [data.gateway_id]).then(response => {
                            resolve({status: true})
                        }).catch(error => {
                            reject({status: false})
                        })
                    } else {
                        resolve({status: true})
                    }
                } catch (e) {
                    reject(e)
                }
            }).catch(error => {
                reject(error)
            })
        });
    }
}

module.exports = TransactionsAction;
