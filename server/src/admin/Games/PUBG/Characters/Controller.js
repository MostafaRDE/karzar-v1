const Actions = require('./Actions');

module.exports = {
    index(req, res) {
        let actions = new Actions();
        actions.index(req.query.page, req.query.size, req.query.status).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(500).send(error)
        })
    },

    updateStatus(req, res) {
        let actions = new Actions();
        actions.updateStatus(req.params.id, req.body.status, req.body.status_reason).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(500).send(error)
        })
    }
};
