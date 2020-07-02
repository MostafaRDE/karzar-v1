const Actions = require('./Actions');
const storage = require('../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang, request.user.id, request.query.page, request.query.size).then(res => {
            response.json(res)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    store(request, response) {
        let actions = new Actions(),
            attachment = request.file,
            req = request,
            body = request.body;

        if (attachment) {
            storage.array('file')(request, response, function (err) {
                if (err)
                    response.status(500).end("Something went wrong:(");
                mediaSaveFile(attachment, null).then(media => {
                    actions.store(req.query.lang, req.user.id, req.connection.remoteAddress, body.amount, body.description, body.gateway_id, body.in_order_to, body.type, media.id, body.data).then(res => {
                        response.json(res)
                    }).catch(error => {
                        response.status(500).send(error)
                    })
                })
            })
        } else {
            actions.store(req.query.lang, req.user.id, req.connection.remoteAddress, body.amount, body.description, body.gateway_id, body.in_order_to, body.type, undefined, body.data).then(res => {
                response.json(res)
            }).catch(error => {
                response.status(500).send(error)
            });
        }
    },
};
