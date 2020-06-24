const Actions = require('./Actions');

module.exports = {
    index(req, res) {
        let actions = new Actions();
        actions.index(req.query.page, req.query.size, req.query.pending || false).then(data => {
            res.json(data)
        }).catch(error => {
            res.send(error)
        })
    },

    updateStatus(req, res) {
        let actions = new Actions();
        actions.updateStatus(req.params.id, req.body.status).then(data => {
            res.json(data)
        }).catch(error => {
            res.send(error)
        })
    }
};
