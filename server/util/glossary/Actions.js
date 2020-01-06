const {GlossaryModel} = require('./Model');

class GlossaryActions {
    getTranslates(key) {
        return new Promise((resolve, reject) => {
            let glossaryModel = new GlossaryModel();
            glossaryModel.fetch_all('key_lang, text', ['key'], [key]).then(data => {
                let response = {};
                for (let i = 0; i < data.result.length; i++)
                    response[data.result[i].key_lang] = data.result[i].text;
                resolve(response)
            }).catch(reject)
        })
    }

    translate(key, keyLang) {
        return new Promise((resolve, reject) => {
            let glossaryModel = new GlossaryModel();
            glossaryModel.fetch_one('text', ['key', 'key_lang'], [key, keyLang]).then(data => {
                if (data !== undefined && data.hasOwnProperty('text'))
                    resolve(data.text);
                else
                    resolve(null)
            }).catch(reject)
        })
    }

    store(key, keyLang, value) {
        return new Promise(async (resolve, reject) => {
            let glossaryModel = new GlossaryModel();
            try {
                let glossary = await glossaryModel.insertSync(['key_lang', 'key', 'text'], [keyLang, key, value]);
                resolve(glossary.id)
            } catch (e) {
                reject(e)
            }
        });
    }

    update(key, keyLang, value) {
        return new Promise(async (resolve, reject) => {
            let glossaryModel = new GlossaryModel();
            try {
                let glossary = await glossaryModel.update(['text'], [value], ['key_lang', 'key'], [keyLang, key]);
                resolve(glossary.id)
            } catch (e) {
                reject(e)
            }
        });
    }
}

module.exports = GlossaryActions;
