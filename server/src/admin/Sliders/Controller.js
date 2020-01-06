const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.getSliders().then(data => {
            response.json(data)
        }).catch(err => response.send(err))
    },

    store(request, response) {
        let actions = new Actions();
        actions.store(request.body.name).then(data => {
            response.json(data)
        }).catch(err => response.send(err))
    },
};
