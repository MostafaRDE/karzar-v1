const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.filter || null).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
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
            request.body.amount
        ).then(res => response.json(res)).catch(err => response.send(err))
    },
};
