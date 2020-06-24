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

                searchQuery = ` AND (users.name ILIKE '%${search}%' OR users.email ILIKE '%${search}%' OR users.whatsapp_number ILIKE '%${search}%' ${amount}) `;
                searchQueryFirst = `WHERE users.name ILIKE '%${search}%' OR users.email ILIKE '%${search}%' OR users.whatsapp_number ILIKE '%${search}%' ${amount} `;
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

    store(name, email, whatsapp_number, password) {
        return new Promise(async (resolve, reject) => {
            let model = new UserModel();

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, pass_hash) {
                    model.insert(['name', 'email', 'whatsapp_number', 'password'], [name, email, whatsapp_number, pass_hash]);
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
                resolve(data)
            }).catch(reject)
        })
    }

    update(id, name, email, whatsapp_number, media_id = null) {
        return new Promise(async (resolve, reject) => {
            let model = new UserModel();
            model.update(media_id ? ['name', 'email', 'whatsapp_number', 'media_id'] : ['name', 'email', 'whatsapp_number'], media_id ? [name, email, whatsapp_number, media_id] : [name, email, whatsapp_number], ['id'], [id]).then(data => {
                return resolve({status: true});
            }).catch(error => {
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
