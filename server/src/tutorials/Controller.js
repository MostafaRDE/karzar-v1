const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang, request.query.page, request.query.size).then(data => {
            response.json(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    }
};
