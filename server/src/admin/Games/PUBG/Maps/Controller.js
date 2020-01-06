const Actions = require('./Actions');
const storage = require('./../../../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang || null).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    store(request, response) {
        let actions = new Actions(),
            image = request.files[0],
            imageDescription = request.body.image_description,
            names = JSON.parse(request.body.name);

        storage.array('file')(request, response, function (err) {
            if (err)
                response.status(500).end("Something went wrong:(");
            mediaSaveFile(image, imageDescription || null).then(media => {
                actions.store(media.id, names)
                    .then(res => response.json(res)).catch(err => response.send(err))
            }).catch(err => response.send(err))
        });
    },

    show(request, response) {
        let actions = new Actions();
        actions.show(request.params.id, request.query.lang || null).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    update(request, response) {
        let actions = new Actions(),
            image = request.files[0],
            imageDescription = request.body.image_description,
            names = JSON.parse(request.body.name);

        if (image) {
            storage.array('file')(request, response, function (err) {
                if (err)
                    response.status(500).end("Something went wrong:(");
                mediaSaveFile(image, imageDescription || null).then(media => {
                    actions.update(request.params.id, media.id, names, request.query.lang || null)
                        .then(res => response.json(res)).catch(err => response.send(err))
                }).catch(err => response.send(err))
            });
        } else {
            actions.update(request.params.id, 0, names, request.query.lang || null)
                .then(res => response.json(res)).catch(err => response.send(err))
        }
    },

    destroy(request, response) {
        let actions = new Actions();
        actions.destroy(request.params.id).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },
};
