const {MediaModel} = require('../../Models/MediaModel');
const moment = require('moment');
const imageThumbnail = require('image-thumbnail');
const fs = require('fs');
const path = require('path');

module.exports.getFile = function (id, thumb) {
    return new Promise((resolve, reject) => {
        if (id !== null) {
            let mediaModel = new MediaModel();

            mediaModel.fetch_one(['id', 'filename_physical', 'filename_logical', 'description', 'mimetype', 'thumbs', 'created_at', 'updated_at'], ['id'], [id]).then(file => {
                let date = moment(file.updated_at);

                file['url'] = `${process.env.UPLOADS_DIR}/${date.format('YYYY')}/${date.format('MM')}/${date.format('DD')}/${file.filename_physical}`;

                if (thumb) {
                    if (file.thumbs) {
                        let thumbs = file.thumbs.split(',');
                        let indexThumb = thumbs.indexOf(thumb);

                        if (indexThumb > -1) {
                            let basenameWithoutExtname = path.basename(file['url']),
                                extname = path.extname(file['url']);
                            if (extname && extname !== '')
                                basenameWithoutExtname = path.basename(file['url']).substring(0, path.basename(file['url']).lastIndexOf(extname));
                            else
                                extname = '';

                            file['url'] = `${process.env.UPLOADS_DIR}/${date.format('YYYY')}/${date.format('MM')}/${date.format('DD')}/${basenameWithoutExtname}_thumb_${thumb}${extname}`
                        } else {
                            reject({
                                status: false,
                                msg: __('messages').there_is_no_photo_of_these_dimensions
                            })
                        }
                    } else {
                        reject({
                            status: false,
                            msg: __('messages').there_is_no_photo_of_these_dimensions
                        })
                    }
                }

                resolve(file)
            }).catch(error => {
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        } else {
            resolve(null)
        }
    });
};


module.exports.saveFile = function (file, description = null) {
    return new Promise((resolve, reject) => {
        let mediaModel = new MediaModel();
        let thumbs = '24,32,48,64,128,256,512,1024';
        mediaModel.insertSync(
            ['filename_physical', 'filename_logical', 'description', 'mimetype', 'thumbs'],
            [file.filename, file.originalname, description, file.mimetype, thumbs],
            'id, updated_at, filename_physical'
        ).then(async file => {

            try {
                let date = moment(file.updated_at);
                let filePath = `${process.env.UPLOADS_DIR}/${date.format('YYYY')}/${date.format('MM')}/${date.format('DD')}/${file.filename_physical}`;

                let basenameWithoutExtname = path.basename(filePath),
                    extname = path.extname(filePath);
                if (extname && extname !== '')
                    basenameWithoutExtname = path.basename(filePath).substring(0, path.basename(filePath).lastIndexOf(extname));
                else
                    extname = '';

                let widths = thumbs.split(',').map(x => parseInt(x));
                for (let i = 0; i < widths.length; i++) {
                    let options = { width: widths[i], responseType: 'buffer' };
                    fs.writeFile(
                        `${process.env.UPLOADS_DIR}/${date.format('YYYY')}/${date.format('MM')}/${date.format('DD')}/${basenameWithoutExtname}_thumb_${widths[i]}${extname}`,
                        await imageThumbnail(filePath, options),
                        function(err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

                resolve(file)

            } catch (err) {
                console.error(err);
            }

        }).catch(error => {
            reject({
                status: false,
                msg: __('messages').internal_server_error
            })
        });
    });
};
