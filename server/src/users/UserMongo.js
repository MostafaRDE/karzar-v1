"use strict";
const moment = require('moment');

const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL_DB + '/' + process.env.MONGO_DB_NAME);

let Schema = mongoose.Schema;

/* جدول ذخیره توکن های ارسالی به کاربر */
let UserTokensSchema = new Schema({
    user : Number,
    email_address: String,
    token : String,
    ip : String,
    created_at: { type : Date , default: moment().format() },
    expired_at: Date,
    status : {type : String , default : "NEW"},
    mode : {type : String , enum: ['VALID_EMAIL' , "VALID_PASSWORD" , "VALID_CHANGE_PASSWORD"]}
});
let UserTokens = mongoose.model('users_tokens' , UserTokensSchema);

/* جدول گزارشات لاگین کاربر */
let UserLoginSchema = new Schema({
    user : Number,
    ip: String,
    useragent: Object,
    created_at: { type : Date , default: moment().format() },
});
let UserLoginHistory = mongoose.model('report_user_login_history' , UserLoginSchema);

/*  جدول گزارشات درخواست های کاربر */
let UserOperationRequestSchema = new Schema({
    user : Number,
    ip: String,
    operation: {
        type : String,
        enum : ['SEND_LINK_FOR_CHANGE_PASSWORD' , "CHANGE_PASSWORD"]
    },
    detail: Object,
    created_at: { type : Date , default: moment().format() },
});
let UserOperationRequest = mongoose.model('report_user_operation_request' , UserOperationRequestSchema);

module.exports = {
    UserTokens,
    UserLoginHistory,
    UserOperationRequest,
};

