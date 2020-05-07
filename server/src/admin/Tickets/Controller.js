let Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index().then(data => {
            response.json(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    store(request, response) {
        let actions = new Actions();
        actions.store().then(data => {
            response.json(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    }
};
