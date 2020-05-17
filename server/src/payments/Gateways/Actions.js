const {GatewayModel} = require('../../../Models/GatewayModel');
const translate = require('../../../util/glossary').translate;

class Actions {
    index(lang) {
        return new Promise((resolve, reject) => {
            let model = new GatewayModel();
            model.fetch_all('*', undefined, undefined, undefined, undefined, undefined, undefined, 'id').then(async data => {
                for (let i = 0; i < data.result.length; i++) {
                    data.result[i].key1 = await translate(data.result[i].glossary_key_key_1, lang);
                    data.result[i].key2 = await translate(data.result[i].glossary_key_key_2, lang);
                }
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
