const {PubgCharacterModel} = require('./../../../../../Models/PubgModel');

class CharacterActions {
    index(page, size, status = undefined) {
        return new Promise((resolve, reject) => {
            let pubgCharacterModel = new PubgCharacterModel();
            let where = undefined, whereValue = undefined;
            if (status) {
                where = ['status'];
                whereValue = [];

                switch (status) {
                    case 'ACCEPTED':
                        whereValue.push(1);
                        break;

                    case 'REJECTED':
                        whereValue.push(2);
                        break;

                    case 'PENDING':
                    default:
                        whereValue.push(0);
                }
            }
            pubgCharacterModel.fetch_all('characters.*, users.name as owner_name, users.email', where, whereValue, undefined, [
                {type: 'INNER', alias: 'users', parent: 'user_id', child: 'id'}
            ], page, size, 'id DESC, status').then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    updateStatus(id, status, status_reason) {
        return new Promise((resolve, reject) => {
            let pubgCharacterModel = new PubgCharacterModel();
            pubgCharacterModel.update(['status', 'status_reason'], [status, status_reason], ['id'], [id]).then(res => {
                resolve({status: true})
            }).catch(err => {
                console.error(err);
                reject({status: false})
            })
        });
    }
}

module.exports = CharacterActions;
