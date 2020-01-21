const {ContactUsModel, PublicModel} = require('../../Models/PublicModel');

class Actions {
    getPublicContent(key) {
        return new Promise((resolve, reject) => {
            let model = new PublicModel();
            model.fetch_one('content', ['key'], [key]).then(data => {
                if (data) {
                    resolve({
                        status: true,
                        content: data.content
                    })
                } else {
                    resolve({
                        status: true,
                        content: null
                    })
                }
            }).catch(err => {
                console.log(err);
                reject({
                    status: true,
                    msg: __('message').internal_server_error
                })
            })
        })
    }

    storeContact(name, email, message) {
        return new Promise((resolve, reject) => {
            let model = new ContactUsModel();
            model.insertSync(['name', 'email', 'message'], [name, email, message]).then(res => {
                resolve({
                    status: true
                })
            }).catch(err => {
                console.log(err);
                reject({
                    status: true,
                    msg: __('message').internal_server_error
                })
            })
    })
    }
}

module.exports =  Actions;
