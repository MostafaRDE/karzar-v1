"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class TotalAmountModel extends pg_helper {
    constructor() {
        super('total_amount')
    }
}

class TransactionModel extends pg_helper {
    constructor() {
        super('transactions')
    }
}

module.exports = {TotalAmountModel, TransactionModel};
