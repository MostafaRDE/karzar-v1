"use strict";

const pg_helper = require('../../util/db/psql/pg_help');

class GlossaryModel extends pg_helper {
    constructor() {
        super('glossaries')
    }
}

module.exports = {GlossaryModel};
