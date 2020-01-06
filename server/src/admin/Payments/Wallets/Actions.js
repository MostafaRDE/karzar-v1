const {WalletModel} = require('../../../../Models/WalletModel.js');

class WalletsActions {
    index(filter = null) {
        return new Promise((resolve, reject) => {
            let model = new WalletModel();
            if (filter === 'HAS_AMOUNT') {
                model.fetch_all_custom('SELECT * FROM wallets where amount > 0').then(async data => {
                    resolve(data)
                }).catch(reject)
            } else {
                model.fetch_all('*').then(async data => {
                    resolve(data)
                }).catch(reject)
            }
        })
    }

    show(id) {
        return new Promise((resolve, reject) => {
            let model = new WalletModel();
            model.fetch_one('*', ['id'], [id]).then(async data => {
                resolve(data)
            }).catch(reject)
        })
    }

    update(id, amount) {
        return new Promise(async (resolve, reject) => {
            let model = new WalletModel();
            model.update(['amount'], [amount], ['id'], [id]).then(data => {
                resolve({status: true})
            }).catch(error => reject(error))
        })
    }
}

module.exports = WalletsActions;
