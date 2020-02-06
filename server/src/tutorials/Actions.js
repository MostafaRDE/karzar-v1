const {TutorialsModel} = require('../../Models/TutorialsModel');
const mediaGetFile = require('../../util/media').getFile;
const getTranslates = require('../../util/glossary').getTranslates;
const translate = require('../../util/glossary').translate;

class Actions {
    index(lang, page, size) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            tutorialsModel.fetch_all('*', undefined, undefined, undefined, undefined, page, size, 'id DESC').then(async data => {

                for (let i = 0; i < data.result.length; i++) {
                    data.result[i].image = await mediaGetFile(data.result[i].image_media_id);
                    data.result[i].title = lang ? await translate(data.result[i].glossary_key_title, lang) : await getTranslates(data.result[i].glossary_key_title);
                    data.result[i].text = lang ? await translate(data.result[i].glossary_key_text, lang) : await getTranslates(data.result[i].glossary_key_text);
                }

                resolve(data)
            }).catch(error => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        })
    }
}

module.exports = Actions;
