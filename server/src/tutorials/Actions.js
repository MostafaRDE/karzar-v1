const {TutorialsModel} = require('../../Models/TutorialsModel');

class Actions {
    index(page, size) {
        return new Promise((resolve, reject) => {
            let tutorialsModel = new TutorialsModel();
            tutorialsModel.fetch_all('*', undefined, undefined, undefined, undefined, page, size, 'id DESC').then(data => {
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
