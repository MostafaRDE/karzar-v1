const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.type).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    store(request, response) {
        let actions = new Actions();

        actions.store(
            request.body.amount,
            request.body.description,
            request.body.gateway,
            request.connection.remoteAddress,
            request.body.in_order_to,
            request.body.type,
            request.body.wallet_id
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    show(request, response) {
        let actions = new Actions();
        actions.show(request.params.id).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    update(request, response) {
        let actions = new Actions();

        actions.update(
            request.params.id,
            request.body.amount,
            request.body.description,
            request.body.gateway,
            request.connection.remoteAddress,
            request.body.in_order_to,
            request.body.type,
            request.body.wallet_id
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    updateAmount(request, response) {
        let actions = new Actions();

        actions.updateAmount(
            request.params.id,
            request.body.amount
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    updateStatus(request, response) {
        let actions = new Actions();

        actions.updateStatus(
            request.params.id,
            request.body.status,
            request.body.status_description
        ).then(res => response.json(res)).catch(err => response.send(err))
    },
};
