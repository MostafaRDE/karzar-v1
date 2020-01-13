const {WalletTransactionsModel} = require("../../../Models/WalletModel");

class Actions {
    index(lang, userId, page, size) {
        return new Promise((resolve, reject) => {
            let model = new WalletTransactionsModel();
            model.fetch_all_custom(`SELECT wallet_transactions.* FROM wallet_transactions INNER JOIN wallets ON (wallets.id = wallet_transactions.wallet_id) WHERE wallets.user_id = ${userId} ORDER BY wallet_transactions.id DESC`, page, size).then(resolve).catch(reject)
        })
    }
}

module.exports = Actions;
