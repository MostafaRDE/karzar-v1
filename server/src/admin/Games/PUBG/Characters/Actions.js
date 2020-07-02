const {PubgCharacterModel} = require('./../../../../../Models/PubgModel');

class CharacterActions {
    index(page, size, justPending = false) {
        return new Promise((resolve, reject) => {
            let pubgCharacterModel = new PubgCharacterModel();
            let where = undefined, whereValue = undefined;
            if (justPending) {
                where = ['status'];
                whereValue = ['0'];
            }
            pubgCharacterModel.fetch_all('characters.*, users.name as owner_name, users.email', where, whereValue, undefined, [
                {type: 'INNER', alias: 'users', parent: 'user_id', child: 'id'}
            ], page, size, 'updated_at DESC').then(data => {
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
