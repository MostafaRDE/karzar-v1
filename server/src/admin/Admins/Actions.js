const bcrypt = require("bcrypt");
const {generateSecretForGoogleAuthenticator} = require("../../../util/helper/functions");
const {AdminModel, PermissionModel, PermissionUserPivot} = require('../../../Models/AdminModel');

class AdminActions {
    index(lang = null) {
        return new Promise((resolve, reject) => {
            let model = new AdminModel();
            model.fetch_all_custom('SELECT * FROM admin.users ORDER BY admin.users.id DESC').then(async data => {
                for (let i = 0; i < data.result.length; i++) {
                    let permissions = await model.getPermissions(data.result[i].id);
                    let permissionsIds = [];
                    permissions.result.forEach(permission => {
                        permissionsIds.push(permission.id)
                    });

                    data.result[i].permissions = permissions.result;
                    data.result[i].permissionsIds = permissionsIds;
                }
                resolve(data)
            }).catch(reject)
        });
    }

    permissions(lang = null) {
        return new Promise((resolve, reject) => {
            let model = new PermissionModel();
            model.fetch_all_custom('SELECT * FROM admin.permissions ORDER BY label ASC').then(resolve).catch(reject)
        });
    }

    store(name, email, username, password, role) {
        return new Promise(async (resolve, reject) => {
            let model = new AdminModel();

            try {
                // check exist
                let find = await model.fetch_one('id', ['username', 'email'], [username, email], 'OR');
                if (!find) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, async (err, pass_hash) => {
                            model.insertSync(['name', 'email', 'username', 'password', 'role', 'secret'], [name, email, username, pass_hash, role, generateSecretForGoogleAuthenticator()]).then(response => {
                                resolve({status: true})
                            }).catch(error => {
                                reject({status: false})
                            })
                        })
                    })
                } else return resolve({status: false, msg: 'این مدیر از قبل موجود میباشد'});
            } catch (e) {
                reject(e);
            }
        });
    }

    update(id, name, email, username, role) {
        return new Promise(async (resolve, reject) => {
            let model = new AdminModel();

            model.update(['name', 'email', 'username', 'role'], [name, email, username, role], ['id'], [id]).then(res => {
                return resolve({status: true})
            }).catch(err => {
                return reject({status: false})
            })
        })
    }

    update2fa(id) {
        return new Promise(async (resolve, reject) => {
            let model = new AdminModel();

            model.update(['secret'], [generateSecretForGoogleAuthenticator()], ['id'], [id]).then(res => {
                return resolve({status: true})
            }).catch(err => {
                return reject({status: false})
            })
        })
    }

    updatePassword(id, password) {
        return new Promise(async (resolve, reject) => {
            let model = new AdminModel();

            try {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, async (err, pass_hash) => {
                        model.update(['password'], [pass_hash], ['id'], [id]).then(res => {
                            return resolve({status: true})
                        }).catch(err => {
                            return reject({status: false})
                        })
                    })
                })
            } catch (e) {
                return reject(e)
            }
        })
    }

    updatePermissions(id, permissions) {
        return new Promise(async (resolve, reject) => {
            let model = new PermissionUserPivot();

            model.syncPivot('user_id', 'permission_id', id, permissions).then(response => {
                resolve({status: true})
            }).catch(error => {
                reject({status: false})
            })
        });
    }

    block(id) {
        return new Promise(async (resolve, reject) => {
            let model = new AdminModel();

            model.update(['blocked_at'], ['now()'], ['id'], [id]).then(res => {
                return resolve({status: true})
            }).catch(err => {
                return reject({status: false})
            })
        })
    }

    unblock(id) {
        return new Promise(async (resolve, reject) => {
            let model = new AdminModel();

            model.update(['blocked_at'], [null], ['id'], [id]).then(res => {
                return resolve({status: true})
            }).catch(err => {
                return reject({status: false})
            })
        })
    }
}

module.exports = AdminActions;
