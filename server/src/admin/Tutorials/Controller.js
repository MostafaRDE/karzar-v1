let Actions = require('./Actions');
const storage = require('../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.page, request.query.size).then(data => {
            response.json(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    store(request, response) {
        let actions = new Actions(),
            image = request.files[0],
            imageDescription = request.body.image_description,
            youtubeLink = request.body.youtube_link,
            title = JSON.parse(request.body.title || '{}'),
            text = JSON.parse(request.body.text || '{}');
        storage.array('file')(request, response, function (err) {
            if (err)
                response.status(500).end("Something went wrong:(");
            mediaSaveFile(image, imageDescription || null).then(media => {
                actions.store(title, text, youtubeLink, media.id)
                    .then(res => response.json(res)).catch(err => response.send(err))
            }).catch(err => response.send(err))
        });
    },

    update(request, response) {
        let actions = new Actions(),
            id = request.params.id,
            image = request.files[0],
            imageDescription = request.body.image_description,
            youtubeLink = request.body.youtube_link,
            title = JSON.parse(request.body.title || '{}'),
            text = JSON.parse(request.body.text || '{}');
        if (image) {
            storage.array('file')(request, response, function (err) {
                if (err)
                    response.status(500).end("Something went wrong:(");
                mediaSaveFile(image, imageDescription || null).then(media => {
                    actions.update(id, title, text, youtubeLink, media.id)
                        .then(res => response.json(res)).catch(err => response.send(err))
                }).catch(err => response.send(err))
            });
        } else {
            actions.update(id, title, text, youtubeLink)
                .then(res => response.json(res)).catch(err => response.send(err))
        }
    },

    destroy(request, response) {
        let actions = new Actions();
        actions.destroy(request.params.id).then(res => {
            response.json(res)
        }).catch(error => {
            response.status(500).send(error)
        })
    },
};
