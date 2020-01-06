"use strict";

const { Pool } = require('pg');

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.test') });
}else {
    require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.server') });
}

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
};
