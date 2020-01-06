const {MediaModel} = require('../../Models/MediaModel');
const moment = require('moment');

module.exports.getFile = function (id) {
    return new Promise((resolve, reject) => {
        if (id !== null) {
            let mediaModel = new MediaModel();

            mediaModel.fetch_one(['id', 'filename_physical', 'filename_logical', 'description', 'mimetype', 'created_at', 'updated_at'], ['id'], [id]).then(file => {
                let date = moment(file.updated_at);
                file['url'] = `${process.env.UPLOADS_DIR}/${date.format('YYYY')}/${date.format('MM')}/${date.format('DD')}/${file.filename_physical}`;
                resolve(file)
            }).catch(reject)
        } else {
            resolve(null)
        }
    });
};


module.exports.saveFile = function (file, description = null) {
    return new Promise((resolve, reject) => {
        let mediaModel = new MediaModel();
        mediaModel.insert(
            ['filename_physical', 'filename_logical', 'description', 'mimetype'],
            [file.filename, file.originalname, description, file.mimetype]
        );

        mediaModel.on('insert', async data => {
            resolve(data)
        });

        mediaModel.on('insert_error', data => {
            reject(data)
        });
    });
};
