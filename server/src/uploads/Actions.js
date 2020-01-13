const mediaGetFile = require('../../util/media').getFile;
const mediaSaveFile = require('../../util/media').saveFile;

class UploadActions {
    async getFile(id, thumb) {
        return await mediaGetFile(id, thumb)
    }
    upload(file) {
        return new Promise((resolve, reject) => {
            mediaSaveFile(file).then(res => {
                resolve(res)
            }).catch(err => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        })
    }
}

module.exports = UploadActions;
