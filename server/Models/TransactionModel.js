"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class TransactionModel extends pg_helper {
    constructor() {
        super('transactions')
    }
}

module.exports = {TransactionModel};
