"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class ContactUsModel extends pg_helper {
    constructor() {
        super('contact_us')
    }
}

module.exports = {ContactUsModel};
