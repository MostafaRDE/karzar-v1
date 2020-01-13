"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class TutorialsModel extends pg_helper {
    constructor() {
        super('tutorials')
    }
}

module.exports = {TutorialsModel};
