const Actions = require('./Actions');

module.exports = {
    index(req, res) {
        let actions = new Actions();
        actions.index(req.query.page, req.query.size).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(500).send(error)
        })
    }
};
