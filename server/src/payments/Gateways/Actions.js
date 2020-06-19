const {GatewayModel} = require('../../../Models/GatewayModel');
const translate = require('../../../util/glossary').translate;

class Actions {
    index(lang, type) {
        return new Promise((resolve, reject) => {
            let model = new GatewayModel();

            let whereKeys = [], whereValues = [];

            whereKeys.push('is_active');
            whereValues.push('true');

            if (type === 'deposit') {
                whereKeys.push('is_deposit');
                whereValues.push('true');
            } else if (type === 'withdrawal') {
                whereKeys.push('is_withdrawal');
                whereValues.push('true');
            }

            model.fetch_all('*', whereKeys, whereValues, undefined, undefined, undefined, undefined, 'id').then(async data => {
                for (let i = 0; i < data.result.length; i++) {
                    if (type === 'deposit') {
                        data.result[i].key1 = await translate(data.result[i]['glossary_key_key_1_deposit'], lang);
                        data.result[i].key2 = await translate(data.result[i]['glossary_key_key_2_deposit'], lang);
                    } else if (type === 'withdrawal') {
                        data.result[i].key1 = await translate(data.result[i]['glossary_key_key_1_withdrawal'], lang);
                        data.result[i].key2 = await translate(data.result[i]['glossary_key_key_2_withdrawal'], lang);
                    } else if (!type) {
                        data.result[i].key1_deposit = await translate(data.result[i]['glossary_key_key_1_deposit'], lang);
                        data.result[i].key2_deposit = await translate(data.result[i]['glossary_key_key_2_deposit'], lang);
                        data.result[i].key1_withdrawal = await translate(data.result[i]['glossary_key_key_1_withdrawal'], lang);
                        data.result[i].key2_withdrawal = await translate(data.result[i]['glossary_key_key_2_withdrawal'], lang);
                    }
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
