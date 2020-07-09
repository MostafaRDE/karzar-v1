const {PubgCharacterModel} = require('../../../Models/PubgModel.js');
const {UserModel} = require('../../../Models/UserModel.js');
const {WalletModel} = require('../../../Models/WalletModel.js');
const bcrypt = require("bcrypt");
const mediaGetFile = require('../../../util/media').getFile;

class Actions {
    index(search = null, filter = null, page = undefined, size = undefined) {
        return new Promise((resolve, reject) => {
            let model = new UserModel();

            let select = ' users.*, wallets.amount, wallets.id as wallet_id ';
            let innerJoinWalletQuery = ' INNER JOIN wallets ON (users.id = wallets.user_id) ';
            let leftJoinWalletQuery = ' LEFT JOIN wallets ON (users.id = wallets.user_id) ';
            let searchQuery = '';
            let searchQueryFirst = '';
            let orderQuery = ' ORDER BY users.id DESC ';
            if (search) {
                let amount = '';
                if (!isNaN(search))
                    amount = ` OR wallets.amount = '${search}' `;

                searchQuery = ` AND (users.name ILIKE '%${search}%' OR users.email ILIKE '%${search}%' OR users.mobile_number ILIKE '%${search}%' ${amount}) `;
                searchQueryFirst = `WHERE users.name ILIKE '%${search}%' OR users.email ILIKE '%${search}%' OR users.mobile_number ILIKE '%${search}%' ${amount} `;
            }

            switch (filter) {
                case 'HAS_AMOUNT':
                    model.fetch_all_custom(`SELECT ${select} FROM users ${innerJoinWalletQuery} where wallets.amount > 0 ${searchQuery} ${orderQuery}`, page, size).then(async data => {
                         for (let i = 0; i < data.result.length; i++)
                            data.result[i]['profile_image'] = await mediaGetFile(data.result[i].media_id);
                        resolve(data)
                    }).catch(reject);
                    break;

                case 'HAS_NOT_AMOUNT':
                    model.fetch_all_custom(`SELECT ${select} FROM users ${innerJoinWalletQuery} where wallets.amount = 0 ${searchQuery} ${orderQuery}`, page, size).then(async data => {
                        for (let i = 0; i < data.result.length; i++)
                            data.result[i]['profile_image'] = await mediaGetFile(data.result[i].media_id);
                        resolve(data)
                    }).catch(reject);
                    break;

                case 'BLOCKED':
                    model.fetch_all_custom(`SELECT ${select} FROM users ${leftJoinWalletQuery} where users.blocked_at is not null ${searchQuery} ${orderQuery}`, page, size).then(async data => {
                        for (let i = 0; i < data.result.length; i++)
                            data.result[i]['profile_image'] = await mediaGetFile(data.result[i].media_id);
                        resolve(data)
                    }).catch(reject);
                    break;

                default:
                    model.fetch_all_custom(`SELECT ${select} FROM users ${leftJoinWalletQuery} ${searchQueryFirst} ${orderQuery}`, page, size).then(async data => {
                        for (let i = 0; i < data.result.length; i++)
                            data.result[i]['profile_image'] = await mediaGetFile(data.result[i].media_id);
                        resolve(data)
                    }).catch(reject)
            }
        })
    }

    store(name, email, mobile_number, password) {
        return new Promise(async (resolve, reject) => {
            let model = new UserModel();

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, pass_hash) {
                    model.insert(['name', 'email', 'mobile_number', 'password'], [name, email, mobile_number, pass_hash]);
                    model.on('insert', async data => {
                        let walletModel = new WalletModel();
                        await walletModel.insertSync(['amount', 'user_id'], [0, data.id])

                        return resolve({status: true});
                    });
                    model.on('insert_error', data => {
                        reject({status: false})
                    });
                })
            });
        });
    }

    show(id) {
        return new Promise((resolve, reject) => {
            let model = new UserModel();
            model.fetch_one('*', ['id'], [id]).then(async data => {
                data.password = undefined;

                if (data.media_id)
                    data['profile_image'] = await mediaGetFile(data.media_id);

                resolve(data)
            }).catch(e => {
                console.error(e);
                reject(e)
            })
        })
    }

    getBalance(id) {
        return new Promise((resolve, reject) => {
            let model = new WalletModel();
            model.fetch_one('*', ['user_id'], [id]).then(data => {
                data = {
                    amount: data.amount,
                };
                resolve(data)
            }).catch(e => {
                console.error(e);
                reject(e)
            })
        })
    }

    getCharacters(id, page, itemsPerPage) {
        return new Promise((resolve, reject) => {
            let model = new PubgCharacterModel();
            model.fetch_all('*', ['user_id'], [id], undefined, undefined, page, itemsPerPage, 'id DESC').then(data => {
                resolve(data)
            }).catch(e => {
                console.error(e);
                reject(e)
            })
        })
    }

    update(id, {name, description, email, email_verified_at, mobile_number, mobile_number_verified_at, blocked_at, media_id}) {
        return new Promise(async (resolve, reject) => {
            let model = new UserModel();
            let keys = [], values = [];
            if (name) {
                keys.push('name');
                values.push(name);
            }
            if (typeof description !== 'undefined') {
                if (description !== '') {
                    keys.push('description');
                    values.push(description);
                } else {
                    keys.push('description');
                    values.push(null);
                }
            }
            if (email) {
                keys.push('email');
                values.push(email);
            }
            if (typeof email_verified_at !== 'undefined') {
                if (email_verified_at === 'true') {
                    keys.push('email_verified_at');
                    values.push('now()');
                } else {
                    keys.push('email_verified_at');
                    values.push(null);
                }
            }
            if (mobile_number) {
                keys.push('mobile_number');
                values.push(mobile_number);
            }
            if (typeof mobile_number_verified_at !== 'undefined') {
                if (mobile_number_verified_at === 'true') {
                    keys.push('mobile_number_verified_at');
                    values.push('now()');
                } else {
                    keys.push('mobile_number_verified_at');
                    values.push(null);
                }
            }
            if (typeof blocked_at !== 'undefined') {
                if (blocked_at === 'true') {
                    keys.push('blocked_at');
                    values.push('now()');
                } else {
                    keys.push('blocked_at');
                    values.push(null);
                }
            }
            if (media_id) {
                keys.push('media_id');
                values.push(media_id);
            }

            console.log(keys, values)
            model.update(keys, values, ['id'], [id]).then(data => {
                return resolve({status: true});
            }).catch(error => {
                console.error(error);
                reject({status: false})
            })
        });
    }

    block(id) {
        return new Promise(async (resolve, reject) => {
            let model = new UserModel();

            model.update(['blocked_at'], ['now()'], ['id'], [id]).then(data => {
                resolve({status: true})
            }).catch(error => {
                reject({status: false})
            })
        });
    }

    unblock(id) {
        return new Promise(async (resolve, reject) => {
            let model = new UserModel();

            model.update(['blocked_at'], [null], ['id'], [id]).then(data => {
                resolve({status: true})
            }).catch(error => {
                reject({status: false})
            })
        });
    }

    createWallet(amount, userId) {
        return new Promise(async (resolve, reject) => {
            let model = new WalletModel();
            try {
                await model.insertSync(['amount', 'user_id'], [amount, userId]);
                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        });
    }

    updatePassword(id, password) {
        return new Promise(async (resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, pass_hash) {
                    let model = new UserModel();
                    model.updateEmit(['password'], [pass_hash], ['id'], [id]);
                    model.on('update', async data => {
                        return resolve({status: true});
                    });
                    model.on('update_error', data => {
                        reject({status: false})
                    });
                })
            });
        })
    }
}

module.exports = Actions;
