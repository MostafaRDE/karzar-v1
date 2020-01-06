const mediaGetFile = require('../../util/media').getFile;
const mediaSaveFile = require('../../util/media').saveFile;

class UploadActions {
    async getFile(id) {
        return await mediaGetFile(id)
    }
    upload(file) {
        return new Promise((resolve, reject) => {
            mediaSaveFile(file).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = UploadActions;
