const {ContactUsModel} = require("../../../Models/ContactUsModel");

class ContactUsActions {
    index(page, size, status = undefined) {
        return new Promise((resolve, reject) => {
            let model = new ContactUsModel();
            model.fetch_all('*', undefined, undefined, undefined, undefined, page, size, 'id DESC').then(res => {
                resolve(res)
            }).catch(err => {
                console.error(err);
                reject({status: false})
            })
        })
    }
}

module.exports = ContactUsActions;
