const Actions = require('./Actions');
const {authorize} = require("../../../util/helper/functions");
const storage = require('./../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        if (authorize('users.show', request.user_data)) {
            let actions = new Actions();
            actions.index(request.query.search || null, request.query.filter || null, request.query.page, request.query.size).then(data => {
                response.json(data)
            }).catch(error => {
                response.send(error)
            })
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    store(request, response) {
        if (authorize('users.create', request.user_data)) {
            let actions = new Actions();

            actions.store(
                request.body.name,
                request.body.email,
                request.body.whatsapp_number,
                request.body.password
            ).then(res => response.json(res)).catch(err => response.send(err))
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    show(request, response) {
        if (authorize('users.show', request.user_data)) {
            let actions = new Actions();
            actions.show(request.params.id).then(data => {
                response.json(data)
            }).catch(error => {
                response.send(error)
            })
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    update(request, response) {
        if (authorize('users.update', request.user_data)) {
            let actions = new Actions(),
                name = request.body.name,
                email = request.body.email,
                whatsapp_number = request.body.whatsapp_number,
                image = request.files[0];

            if (image) {
                storage.array('file')(request, response, function (err) {
                        if (err)
                            response.status(500).end("Something went wrong:(");
                        mediaSaveFile(image).then(media => {
                            actions.update(
                                request.params.id,
                                name,
                                email,
                                whatsapp_number,
                                media.id
                            ).then(res => response.json(res)).catch(err => response.send(err))
                        }).catch(err => response.send(err));
                });
            } else {
                actions.update(
                    request.params.id,
                    request.body.name,
                    request.body.email,
                    request.body.whatsapp_number
                ).then(res => response.json(res)).catch(err => response.send(err))
            }
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    block(request, response) {
        if (authorize('users.block', request.user_data)) {
            let actions = new Actions();

            actions.block(
                request.params.id
            ).then(res => response.json(res)).catch(err => response.send(err))
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    unblock(request, response) {
        if (authorize('users.unblock', request.user_data)) {
            let actions = new Actions();

            actions.unblock(
                request.params.id
            ).then(res => response.json(res)).catch(err => response.send(err))
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    createWallet(request, response) {
        if (authorize('users.createWallet', request.user_data)) {
            let actions = new Actions();

            actions.createWallet(
                request.body.amount,
                request.params.id
            ).then(res => response.json(res)).catch(err => response.send(err))
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    },
    updatePassword(request, response) {
        if (authorize('users.updatePassword', request.user_data)) {
            let actions = new Actions();

            actions.updatePassword(
                request.params.id,
                request.body.password
            ).then(res => response.json(res)).catch(err => response.send(err))
        } else {
            response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        }
    }
};
