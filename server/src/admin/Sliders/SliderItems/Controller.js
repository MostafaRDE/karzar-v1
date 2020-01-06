const Actions = require('./Actions');
const storage = require('./../../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.getSliderItems(request.params.id).then(data => {
            response.json(data)
        }).catch(err => response.status(500).send(err))
    },
    store(request, response) {
        let actions = new Actions(),
            image = request.files[0],
            imageDescription = request.body.image_description,
            link = request.body.link;
        storage.array('file')(request, response, function (err) {
            if (err)
                response.status(500).end("Something went wrong:(");
            mediaSaveFile(image, imageDescription || null).then(media => {
                actions.storeSliderItem(request.params.id, media.id, link)
                    .then(res => response.json(res)).catch(err => response.send(err))
            }).catch(err => response.send(err))
        });
    },
};
