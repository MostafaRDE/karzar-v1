const bcrypt = require("bcrypt");
const jwt = require("../../util/jwt/index");
const {AdminModel} = require("../../Models/AdminModel");
const {AdminHistoryLogin} = require("./Mongo");
const {verifyGoogleCodeAuthenticator} = require('../../util/helper/functions');

class AdminActions extends AdminModel {

    /**
     * this is a add manager admin
     *
     * @param name
     * @param email
     * @param username
     * @param password
     * @param role
     * @returns {Promise<Object>}
     */
    add(name, email, username, password, role) {
        return new Promise(async (resolve, reject) => {
            try {
                // check exist
                let find = await this.fetch_one('id', ['username', 'email'], [username, email], 'OR');
                if (!find) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, async (err, pass_hash) => {
                            // TODO :: Insert Admin
                            await this.insertSync(
                                ['name', 'username', 'email', 'password', 'role_id'],
                                [name, username, email, pass_hash, role]);

                            return resolve({status: true});
                        })
                    })

                } else return resolve({status: false, msg: 'این مدیر از قبل موجود میباشد'});
            } catch (e) {
                reject(e);
            }
        });
    }

    login({username, password, googleCodeAuthenticator, ip, user_agent}) {
        return new Promise(async (resolve, reject) => {
            let _this = this;
            let check = await this.fetch_one('*', ['username', 'email'], [username, username], "OR");
            if (check) {
                bcrypt.compare(password, check.password, async function (err, check_hash) {
                    if (check_hash) {
                        if (verifyGoogleCodeAuthenticator(googleCodeAuthenticator, JSON.parse(check.secret))) {

                            // check ip
                            if (check.is_check_ip) {
                                if (Array.isArray(check.ips)) {
                                    if (!check.ips.includes(ip)) {
                                        return resolve({status: false, msg: __("admin").ip_not_allow});
                                    }
                                } else {
                                    return resolve({status: false, msg: __("admin").ip_not_allow});
                                }
                            }

                            // generates permissions
                            let permissions = [];
                            if (check.role !== 'SUPPER_ADMIN') {
                                permissions = await _this.getPermissions(check.id);
                                if (permissions.hasOwnProperty('result'))
                                    permissions = permissions.result;
                                else
                                    permissions = [];
                            }

                            // todo : create access token
                            let access_token = jwt.create({
                                payload: {
                                    id: check.id,
                                    name: check.name,
                                    username: check.username,
                                    email: check.email,
                                    role: check.role,
                                    permissions,
                                }
                            });

                            // todo : add_log_admin
                            await new AdminHistoryLogin({admin_id: check.id, ip, user_agent}).save();

                            return resolve({status: true, access_token});

                        } else {
                            return resolve({status: false, msg: 'کد احراز گوگل صحیح نمی باشد'});
                        }
                    } else {
                    }
                    return resolve({status: false, msg: 'رمز عبور یا نام کاربری صحیح نمیباشد'});
                })
            } else return resolve({status: false, msg: 'رمز عبور یا نام کاربری صحیح نمیباشد'});
        })
    }
}

module.exports = AdminActions;
