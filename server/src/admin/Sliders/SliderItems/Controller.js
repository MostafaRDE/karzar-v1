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
            title = request.body.title,
            description = request.body.description,
            linkText = request.body.link_text,
            imageDescription = request.body.image_description,
            link = request.body.link;

        title = JSON.parse(title || '{}');
        description = JSON.parse(description || '{}');
        linkText = JSON.parse(linkText || '{}');
        storage.array('file')(request, response, function (err) {
            if (err)
                response.status(500).end("Something went wrong:(");
            mediaSaveFile(image, imageDescription || null).then(media => {
                actions.storeSliderItem(request.params.id, media.id, link, title, description, linkText)
                    .then(res => response.json(res)).catch(err => response.send(err))
            }).catch(err => response.send(err))
        });
    },
};
