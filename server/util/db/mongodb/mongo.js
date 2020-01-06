"use strict";

require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.server') });


const MongoClient = require('mongodb').MongoClient;
let url_db = process.env.MONGO_URL_DB;
let db_name = process.env.MONGO_DB_NAME;

class Mongo {
    constructor() {}
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url_db , { useNewUrlParser: true } , function (err, client) {
                if (err) return reject(err);
                const db = client.db(db_name);
                resolve({db , client});
            })
        })
    }

}

module.exports = Mongo;
