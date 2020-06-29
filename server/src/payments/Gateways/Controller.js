const Actions = require('./Actions');

module.exports = {
    index(req, res) {
        let actions = new Actions();
        actions.index(req.query.lang).then(response => {
            res.json(response)
        }).catch(error => {
            res.status(500).send({
                status: false,
                msg: __('messages').internal_server_error
            })
        })
    }
};
