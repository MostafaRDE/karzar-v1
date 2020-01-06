"use strict";

const moment = require('moment');
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let login_schema = new Schema({
    admin_id: Number,
    ip: String,
    user_agent : Object,
    login_at: {type: Date, default: moment().format()},
    logout_at: {type: Date, default: moment().format()},
});
let AdminHistoryLogin = mongoose.model('admin.history.login', login_schema);

module.exports = {AdminHistoryLogin};
