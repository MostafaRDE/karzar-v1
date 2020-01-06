"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class MediaModel extends pg_helper {
    constructor() {
        super('media')
    }
}

module.exports = {MediaModel};
