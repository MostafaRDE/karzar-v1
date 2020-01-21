const Actions = require('./Actions');

module.exports = {
    getPublicContent(req, res) {
        let actions = new Actions();
        actions.getPublicContent(req.params.key).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    storeContact(req, res) {
        let actions = new Actions();
        actions.storeContact(req.body.name, req.body.email, req.body.message).then(data => {
            res.json(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }
};
