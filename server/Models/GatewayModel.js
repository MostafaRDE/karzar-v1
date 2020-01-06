"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class GatewayModel extends pg_helper {
    constructor() {
        super('gateways')
    }
}

module.exports = {GatewayModel};
