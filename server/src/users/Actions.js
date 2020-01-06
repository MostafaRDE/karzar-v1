const {UserModel} = require('../../Models/UserModel');
const bcrypt = require("bcrypt");
const moment = require("moment");
const mailer = require("../../util/mails");
const {UserTokens, UserOperationRequest} = require("./UserMongo");
const encrypter = require('object-encrypter');
const uuid = require("uuid/v4");

class Actions {
    /**
     * This is a login To Account User
     * ==== check email validate
     * ==== check two factor enabled
     * ==== check valid email and password
     * @param email
     * @param password
     * @returns {Promise<any>}
     */
    loginToAccount(email, password) {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            userModel.fetch_one('id , email , password , email_verified_at , whatsapp_number', ['email'], [email])
                .then(data => {
                    if (data) {
                        bcrypt.compare(password, data.password, function (err, check) {
                            if (check) {
                                return resolve({status: true, data: {id: data.id}})
                            } else {
                                return resolve({status: false, msg: __('messages').err_email_or_password_invalid});
                            }
                        })
                    } else {
                        return resolve({status: false, msg: __('messages').err_email_or_password_invalid});
                    }
                }).catch(reject);
        });
    }

    /**
     * This is a add account
     * @param email
     * @param password
     * @param character_name
     * @param whatsapp_number
     * @param refer_code
     * @returns {Promise<any>}
     */
    addAccount({email, password, whatsapp_number, refer_code, lang}) {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            userModel.fetch_one('id , email', ['email'], [email])
                .then(async data => {
                    if (data) {
                        return resolve({status: false, msg: __('messages').err_exist_user})
                    } else {
                        /* کاربر جدید ثبت شود */
                        /* ایمیل تایید سازی ایمیل برای کاربر ارسال شود */
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(password, salt, function (err, pass_hash) {
                                userModel.insert(['email', 'whatsapp_number', 'password', 'refer_code'], [email, whatsapp_number, pass_hash, refer_code]);
                                userModel.on('insert', async data => {
                                    // TODO :: SEND EMAIL APPROVE
                                    await mailer.send_valid_email_address(data.id, email, lang);

                                    return resolve({status: true, is_email_send: true});
                                });
                                userModel.on('insert_error', data => {
                                    console.log(data);
                                    reject(data)
                                });
                            })
                        })
                    }
                }).catch(reject)
        });
    }

    /**
     * This is a validate email by link
     * @param token
     * @returns {Promise<any>}
     */
    validate_email_by_token(token) {
        return new Promise((resolve, reject) => {
            UserTokens.findOne({token}, function (err, doc) {
                if (err) return reject(err);
                if (doc) {
                    /* اگر موجود بود تاریخ انتقضا چک شود که کمتر از 2 ساعت نباشد */
                    /* اگر کمتر از ۲ ساعت بود ایمیل کاربر تایید شود و کد هش شده حذف شود */
                    /*اگر بیشتر از ۲ ساعت بود به صفحه معتبر نبودن کد هش ارسال شود*/
                    /*اگر کد هش موجود نبود به صفحه 404 منتقل شود*/
                    let expire_at = doc.expired_at;
                    let duration = moment.duration(moment(expire_at).diff(moment()));
                    let hours = duration.asHours();

                    if (hours < 2) {
                        // oh ok email is validated
                        let userModel = new UserModel();
                        userModel.fetch_one('id , email', ['id'], [doc.user])
                            .then(data => {
                                if (data) {
                                    userModel.update(['email_verified_at'], ['NOW()'], ['id'], [data.id])
                                        .then(data => {
                                            UserTokens.deleteOne({'_id': doc._id}, async (err, remove_data) => {
                                                return resolve({status: true})
                                            })
                                        })
                                        .catch(reject)
                                } else return resolve({status: false, error: 404, msg: 'user not find'})
                            })
                            .catch(reject);
                    } else {
                        // email is expire
                        return resolve({status: false, error: 422, msg: 'token_expire'})
                    }
                } else {
                    return resolve({status: false, error: 404, msg: 'token not find'})
                }
            });
        });
    }

    /**
     * this is a fetch user for forget password
     * @param username
     * @returns {Promise<any>}
     */
    FindUserDeviceForForgetPassword(username) {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel();
            userModel.fetch_one('id , email , email_verified_at , whatsapp_number', ['email'], [username])
                .then(data => {
                    if (data) {
                        if (!data.email_verified_at) {
                            return resolve({status: false, msg: __('messages').email_or_mobile_not_approve});
                        }

                        let engine = encrypter(process.env.APP_SECRET, {ttl: true});

                        let valid_devices_access = [];
                        if (data.email_verified_at) {
                            let email_split = data.email.split('@');
                            let email_send = email_split[0].substr(0, 3) + '******' + email_split[0].substr(email_split[0].length - 2, 2);
                            let email_detail = {user: data.id, type: 'email'};
                            let hash_email = engine.encrypt(email_detail, 180000);
                            valid_devices_access = [{id: hash_email, value: email_send + '@' + email_split[1]}];
                        }

                        return resolve({status: true, values: valid_devices_access});

                    } else return resolve({status: false, msg: __('messages').user_not_exist});
                })
                .catch(reject)
        });
    }

    /**
     * this is a forget password
     * @param token
     * @param ip
     * @param lang
     * @returns {Promise<any>}
     * @constructor
     */
    CheckDeviceTokenSendLinkForgetPassword(token, ip, lang) {
        return new Promise((resolve, reject) => {
            let engine = encrypter(process.env.APP_SECRET);
            /* بازیابی دیتا */
            try {
                let decrypt = engine.decrypt(token);
                /*اگر دیتا درست بود و کاربر بود*/
                if (decrypt && decrypt.user) {

                    /* تاریخ انتقضا کد هش شده چک میشه */
                    if (new Date().getTime() < decrypt.expires) {
                        const {user, type} = decrypt;
                        let userModel = new UserModel();
                        userModel.fetch_one('id , email', ['id'], [user])
                            .then(data => {
                                if (data) {
                                    if (decrypt.type === 'email') {
                                        mailer.send_forget_password_link(data.email, data.id, ip, lang);
                                    }

                                    /* ثبت گزارش درخواست تغییر رمز عبور برای کاربر  */
                                    let user_mongo = new UserOperationRequest({
                                        user: data.id,
                                        ip: ip,
                                        operation: "SEND_LINK_FOR_CHANGE_PASSWORD",
                                    });
                                    user_mongo.save();


                                    return resolve({status: true})
                                } else {
                                    return resolve({status: false, msg: __('messages').user_not_exist})
                                }
                            })
                            .catch(reject)
                    } else return resolve({status: false, msg: __('messages').expired_token_forget_password})
                } else {
                    return resolve({status: false, msg: __('messages').invalid_token_forget_password})
                }
            } catch (e) {
                return resolve({status: false, msg: __('messages').invalid_token_forget_password})
            }
        });
    }

    /**
     * This is a valid token emails and create random token for change password
     * @param token
     * @param ip
     * @constructor
     */
    ValidTokenAllowChangePassword({token, ip}) {
        return new Promise((resolve, reject) => {
            UserTokens.findOne({token: token}, async function (err, doc) {
                if (err) return reject(err);
                if (doc) {
                    /* آیپی چک شود */
                    if (doc.ip !== ip) {
                        return resolve({status: false, code: 403, msg: "Ip Not valid"});
                    }

                    /*تاریخ انتقضا توکن چک شود*/
                    let expire_at = doc.expired_at;
                    let duration = moment.duration(moment(expire_at).diff(moment()));
                    let hours = duration.asHours();

                    if (hours < 2) {
                        /* ساخت توکن دسترسی برای کاربر */
                        let token_change_password = uuid();

                        /* حذف توکن */
                        await UserTokens.deleteOne({_id: doc._id});

                        /* ثبت توکن جدید  */
                        let userTokens = new UserTokens({
                            token: token_change_password,
                            user: doc.user,
                            ip: ip,
                            email_address: doc.email_address,
                            mode: 'VALID_CHANGE_PASSWORD',
                            expired_at: moment(moment().format()).add(2, 'hours').format(),
                        });

                        userTokens.save();

                        return resolve({status: true, token: token_change_password});

                    } else return resolve({status: false, code: 404, msg: "token expired"});
                } else {
                    return resolve({status: false, code: 404, msg: "token not exist"});
                }
            })
        });
    }

    /**
     * this a change password with token
     * @param token
     * @param password
     * @param ip
     */
    static change_password_by_token({token, password, ip}) {
        return new Promise((resolve, reject) => {
            UserTokens.findOne({token: token, mode: "VALID_CHANGE_PASSWORD"}, function (err, doc) {
                if (err) return reject(err);
                if (doc) {
                    let expire_at = doc.expired_at;
                    let duration = moment.duration(moment(expire_at).diff(moment()));
                    let hours = duration.asHours();

                    if (hours < 2) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, function (err, hash) {
                                let userModel = new UserModel;
                                userModel.update(['password'], [hash], ['id'], [doc.user])
                                    .then(async data => {
                                        /* حذف توکن */
                                        await UserTokens.deleteOne({_id: doc._id});

                                        /* ثبت گزارش درخواست تغییر رمز عبور برای کاربر  */
                                        let user_mongo = new UserOperationRequest({
                                            user: data.id,
                                            ip: ip,
                                            operation: "CHANGE_PASSWORD",
                                        });
                                        user_mongo.save();
                                        return resolve({status: true})
                                    })
                                    .catch(reject)
                            })
                        })
                    } else return resolve({status: false, msg: __('messages').expired_token_forget_password})
                } else return resolve({status: false, msg: __('messages').invalid_token_forget_password})
            });
        });
    }

    /**
     * This is edit user
     * @param params
     * @param where
     * @param where_value
     * @returns {Promise<any>}
     */
    static editUser(params, where, where_value) {
        return new Promise((resolve, reject) => {
            if (typeof params === "object") {
                let key = Object.keys(params),
                    values = Object.values(params);

                let userModel = new UserModel();
                userModel.update(key, values, where, where_value)
                    .then(data => {
                        resolve({status: true})
                    })
                    .catch(reject)
            } else reject('params not object')
        });
    }

    /**
     *
     * @param keys
     * @param values
     * @param usr
     */
    static check_exist_keys(keys, values, usr) {
        return new Promise((resolve, reject) => {
            let userModel = new UserModel;
            userModel.fetch_one('id', [...keys, {name: 'id', type: '!='}], [...values, usr])
                .then(data => {
                    if (data) {
                        resolve({exist: true})
                    } else {
                        resolve({exist: false})
                    }
                })
                .catch(reject)
        });
    }

    removeAccount() {
        return new Promise(async (resolve, reject) => {
            let userModel = new UserModel();
            await userModel.delete([{name: 'id', type: '>', sample: '%s'}], [0]);
            resolve();
        });

    }
}

module.exports = Actions;
