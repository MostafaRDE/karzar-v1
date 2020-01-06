"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class UserModel extends pg_helper {
    constructor() {
        super('users')
    }
}

module.exports = {UserModel};
