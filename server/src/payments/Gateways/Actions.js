const {GatewayModel} = require('../../../Models/GatewayModel');
const translate = require('../../../util/glossary').translate;

class Actions {
    index(lang) {
        return new Promise((resolve, reject) => {
            let model = new GatewayModel();

            model.fetch_all('*', undefined, undefined, undefined, undefined, undefined, undefined, 'id').then(async data => {
                resolve(data)
            }).catch(error => {
                console.log(error);
                reject({
                    status: false,
                    msg: __('messages').internal_server_error,
                })
            })
        })
    }
}

module.exports = Actions;
