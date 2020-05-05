const {TotalAmountModel, TransactionModel} = require("../../../../Models/PaymentModel");
const {WalletModel} = require("../../../../Models/WalletModel");

class TransactionsAction {
    index(type) {
        return new Promise((resolve, reject) => {
            let model = new TransactionModel();
            model.fetch_all_custom(`SELECT * FROM v_transactions_users WHERE type = '${type}' ORDER BY id DESC`).then(async data => {
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

    updateAmount(id, amount) {
        return new Promise(async (resolve, reject) => {
            let model = new TransactionModel();
            model.update(['amount'], [amount], ['id'], [id]).then(data => {
                resolve({status: true})
            }).catch(error => {
                reject(error)
            })
        });
    }

    updateStatus(id, status, statusDescription) {
        return new Promise(async (resolve, reject) => {
            let model = new TransactionModel();
            model.update(['status', 'status_description'], [status, statusDescription], ['id'], [id], undefined, 'id, amount, gateway_id, user_id, type').then(async data => {
                try {
                    if (status === 1) {
                        let totalAmountModel = new TotalAmountModel();
                        let totalAmount = await totalAmountModel.fetch_one('*', ['gateway_id'], [data.gateway_id]);

                        if (data.type === 'INPUT') {
                            totalAmountModel.update(['amount'], [(parseFloat(totalAmount.amount) + parseFloat(data.amount)).toFixed(2)], ['gateway_id'], [data.gateway_id]).then(async response => {
                                let walletModel = new WalletModel();
                                let wallet = await walletModel.fetch_one('*', ['user_id'], [data.user_id]);
                                walletModel.update(['amount'], [(parseFloat(wallet.amount) + parseFloat(data.amount)).toFixed(2)], ['id'], [wallet.id]).then(res2 => {
                                    resolve({status: true})
                                }).catch(error => {
                                    console.error(error);
                                    reject({status: false})
                                })
                            }).catch(error => {
                                console.error(error);
                                reject({status: false})
                            })
                        } else if (data.type === 'OUTPUT') {
                            totalAmountModel.update(['amount'], [(parseFloat(totalAmount.amount) - parseFloat(data.amount)).toFixed(2)], ['gateway_id'], [data.gateway_id]).then(response => {
                                resolve({status: true})
                            }).catch(error => {
                                console.error(error);
                                reject({status: false})
                            })
                        }
                    } else if (status === 2 && data.type === 'OUTPUT') {
                        let walletModel = new WalletModel();
                        let wallet = await walletModel.fetch_one('*', ['user_id'], [data.user_id]);
                        walletModel.update(['amount'], [(parseFloat(wallet.amount) + parseFloat(data.amount)).toFixed(2)], ['id'], [wallet.id]).then(response => {
                            resolve({status: true})
                        }).catch(error => {
                            console.error(error);
                            reject({status: false})
                        })
                    } else {
                        resolve({status: true})
                    }
                } catch (e) {
                    console.error(error);
                    reject(e)
                }
            }).catch(error => {
                reject(error)
            })
        });
    }
}

module.exports = TransactionsAction;
