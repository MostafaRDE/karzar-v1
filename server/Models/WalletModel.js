"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class WalletModel extends pg_helper {
    constructor() {
        super('wallets')
    }
}

class WalletTransactionsModel extends pg_helper {
    constructor() {
        super('wallet_transactions')
    }
}

module.exports = {WalletModel, WalletTransactionsModel};
