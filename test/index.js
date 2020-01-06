process.env.NODE_ENV = 'test';

var i18n = require('i18n');
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

i18n.configure({
    locales:['en', 'fa'],
    directory: process.cwd() + '/src/i18n/locales',
    defaultLocale: 'fa',
    register : global
});

let conn = mongoose.connect(process.env.MONGO_URL_DB + '/' + process.env.MONGO_DB_NAME , { useNewUrlParser: true });

console.log('conn' , conn);