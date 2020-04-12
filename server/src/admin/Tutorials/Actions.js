const {TutorialsModel} = require('../../../Models/TutorialsModel');
const mediaGetFile = require('../../../util/media').getFile;
const {microtime} = require('./../../../util/helper/functions');
const getTranslates = require('../../../util/glossary').getTranslates;
const translate = require('../../../util/glossary').translate;
const translateStore = require('../../../util/glossary').store;
const translateUpdate = require('../../../util/glossary').update;

class Actions {
    index(page, size, user_id) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            let whereKey = user_id ? ['user_id'] : null,
                whereValue = user_id ? [user_id] : null;
            tutorialsModel.fetch_all('*', whereKey, whereValue, undefined, undefined, page, size, 'id DESC').then(async data => {

                for (let i = 0; i < data.total; i++) {
                    data.result[i].title = await getTranslates(data.result[i].glossary_key_title);
                    data.result[i].text = await getTranslates(data.result[i].glossary_key_text);
                    data.result[i].image = await mediaGetFile(data.result[i].image_media_id);
                }

                resolve(data)

            }).catch(err => {
                console.error(err)
                reject(err)
            });
        })
    }

    store(title, text, youtubeLink, imageId, userId) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            const translateKeyTitle = `tutorials_title_${microtime()}`;
            const translateKeyText = `tutorials_text_${microtime()}`;
            tutorialsModel.insertSync(['glossary_key_title', 'glossary_key_text', 'youtube_link', 'image_media_id', 'user_id'], [translateKeyTitle, translateKeyText, youtubeLink, imageId, userId]).then(async response => {

                try {
                    let languages = Object.keys(title);
                    for (let i = 0; i < languages.length; i++) {
                        await translateStore(translateKeyTitle, title[languages[i]], languages[i])
                    }

                    languages = Object.keys(text);
                    for (let i = 0; i < languages.length; i++) {
                        await translateStore(translateKeyText, text[languages[i]], languages[i])
                    }

                    resolve({status: true})
                } catch (e) {
                    reject({status: false})
                }

            }).catch(error => {
                reject({status: false})
            })
        })
    }

    update(id, title, text, youtubeLink, imageId, userId) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            let keys = ['youtube_link'],
                values = [youtubeLink];
            if (imageId) {
                keys.push('image_media_id');
                values.push(imageId);
            }
            tutorialsModel.update(keys, values, ['id'], [id],undefined, 'id, glossary_key_title, glossary_key_text').then(async data => {

                try {
                    let languages = Object.keys(title);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_title, title[languages[i]], languages[i]);
                    languages = Object.keys(text);
                    for (let i = 0; i < languages.length; i++)
                        await translateUpdate(data.glossary_key_text, text[languages[i]], languages[i]);

                    resolve({status: true})
                } catch (e) {
                    reject({status: false})
                }
            }).catch(error => {
                reject({status: false})
            })
        })
    }

    destroy(id) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            tutorialsModel.delete(['id'], [id]).then(response => {
                resolve({status: true})
            }).catch(error => {
                reject({status: false})
            })
        })
    }
}

module.exports = Actions;
