const {TutorialsModel} = require('../../../Models/TutorialsModel');

class Actions {
    index(page, size) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            tutorialsModel.fetch_all('*', undefined, undefined, undefined, undefined, page, size, 'id DESC').then(resolve).catch(reject);
        })
    }

    store(title, text, youtubeLink, imageId) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            tutorialsModel.insertSync(['title', 'text', 'youtube_link', 'image_media_id'], [title, text, youtubeLink, imageId]).then(response => {
                resolve({status: true})
            }).catch(error => {
                reject({status: false})
            })
        })
    }

    update(id, title, text, youtubeLink, imageId) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            let keys = ['title', 'text', 'youtube_link'],
                values = [title, text, youtubeLink];
            if (imageId) {
                keys.push('image_media_id');
                values.push(imageId);
            }
            tutorialsModel.update(keys, values, ['id'], [id]).then(response => {
                resolve({status: true})
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
