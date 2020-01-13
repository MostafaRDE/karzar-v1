const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.user.id, request.query.page, request.query.size).then(res => {
            response.json(res)
        }).catch(error => {
            response.status(500).send({
                status: false,
                msg: __('mwssages').internal_server_error
            })
        })
    },

    store(request, response) {
        let actions = new Actions();
        actions.store(request.user.id, request.connection.remoteAddress, request.body.amount, request.body.description, request.body.gateway_id, request.body.in_order_to, request.body.type).then(res => {
            response.json(res)
        }).catch(error => {
            response.status(500).send({
                status: false,
                msg: __('mwssages').internal_server_error
            })
        })
    },
};
