const path = require('path');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');
const microtime = require('../helper/functions').microtime;

// Storage
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dir = process.env.UPLOADS_DIR,
            year = moment().format('YYYY'),
            month = moment().format('MM'),
            day = moment().format('DD');

        if (!fs.existsSync(`${dir}`))
            fs.mkdirSync(`${dir}`);
        if (!fs.existsSync(`${dir}/${year}`))
            fs.mkdirSync(`${dir}/${year}`);
        if (!fs.existsSync(`${dir}/${year}/${month}`))
            fs.mkdirSync(`${dir}/${year}/${month}`);
        if (!fs.existsSync(`${dir}/${year}/${month}/${day}`))
            fs.mkdirSync(`${dir}/${year}/${month}/${day}`);

        callback(null, `${dir}/${year}/${month}/${day}`);
    },
    filename: function (req, file, callback) {
        callback(null, `${microtime()}${path.extname(file.originalname)}`);
    }
});

// file type filter
let fileFilter = (req, file, callback) => {
    const file_types = /jpeg|jpg|png/;
    const mimetype = file_types.test(file.mimetype);
    const extname = file_types.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return callback(null, true)
    }

    callback('خطا :‌ آپلود فایل فقط برای این فرمت ها مجاز میباشد - ' + file_types);
};

module.exports = multer({storage});
module.exports.imageFilter = multer({fileFilter, storage});
