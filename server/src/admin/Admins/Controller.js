const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang || null).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    permissions(request, response) {
        let actions = new Actions();
        actions.permissions(request.query.lang || null).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    store(request, response) {
        let actions = new Actions();
        actions.store(
            request.body.name,
            request.body.email,
            request.body.username,
            request.body.password,
            request.body.role
        ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    update(request, response) {
        let actions = new Actions();
        actions.update(
            request.params.id,
            request.body.name,
            request.body.email,
            request.body.username,
            request.body.role
        ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    update2fa(request, response) {
        let actions = new Actions();
        actions.update2fa(
            request.params.id
            ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    updatePassword(request, response) {
        let actions = new Actions();
        actions.updatePassword(
            request.params.id,
            request.body.password
        ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    updatePermissions(request, response) {
        let actions = new Actions();
        let permissions = [];

        if (request.body.permissions)
            if (request.body.permissions !== '')
                permissions = request.body.permissions.split(',');

        actions.updatePermissions(
            request.params.id,
            permissions
        ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    block(request, response) {
        let actions = new Actions();
        actions.block(
            request.params.id
        ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    unblock(request, response) {
        let actions = new Actions();
        actions.unblock(
            request.params.id
        ).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },
};
