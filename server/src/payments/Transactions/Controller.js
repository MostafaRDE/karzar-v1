const Actions = require('./Actions');
const storage = require('../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang, request.user.id, request.query.page, request.query.size).then(res => {
            response.json(res)
        }).catch(error => {
            response.status(500).send({
                status: false,
                msg: __('messages').internal_server_error
            })
        })
    },

    store(request, response) {
        console.log(request.files)
        let actions = new Actions(),
            attachment = request.files[0];
        console.log(attachment)

        if (attachment) {
            storage.array('file')(request, response, function (err) {
                if (err)
                    response.status(500).end("Something went wrong:(");
                mediaSaveFile(attachment, null).then(media => {
                    actions.store(req.user.id, req.connection.remoteAddress, req.body.amount, req.body.description, req.body.gateway_id, req.body.in_order_to, req.body.type, media.id).then(res => {
                        response.json(res)
                    }).catch(error => {
                        response.status(500).send({
                            status: false,
                            msg: __('messages').internal_server_error
                        })
                    })
                })
            })
        } else {
            actions.store(req.user.id, req.connection.remoteAddress, req.body.amount, req.body.description, req.body.gateway_id, req.body.in_order_to, req.body.type).then(res => {
                response.json(res)
            }).catch(error => {
                response.status(500).send({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        }
    },
};
