const Actions = require('./Actions');
const storage = require('../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang || null, request.query.type).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    store(request, response) {
        let actions = new Actions(),
            name = request.body.name,
            key1 = JSON.parse(request.body.key1),
            key2 = JSON.parse(request.body.key2),
            type = JSON.parse(request.body.type),
            image = request.files[0];

        storage.array('file')(request, response, function (err) {
            if (err)
                response.status(500).end("Something went wrong:(");

            mediaSaveFile(image).then(media => {
                actions.store(name, key1, key2, media.id, type)
                    .then(res => response.json(res)).catch(err => response.send(err))
            });
        })
    },

    update(request, response) {
        let actions = new Actions(),
            name = request.body.name,
            key1 = JSON.parse(request.body.key1),
            key2 = JSON.parse(request.body.key2),
            type = JSON.parse(request.body.type),
            image = request.files[0];

        if (image) {
            storage.array('file')(request, response, function (err) {
                if (err)
                    response.status(500).end("Something went wrong:(");

                mediaSaveFile(image).then(media => {
                    actions.update(request.params.id, name, key1, key2, type, media.id)
                        .then(res => response.json(res)).catch(err => response.send(err))
                });
            })
        } else {
            actions.update(request.params.id, name, key1, key2, type)
                .then(res => response.json(res)).catch(err => response.send(err))
        }
    },
};
