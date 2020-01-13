const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang, request.user.id, request.query.page, request.query.size).then(res => {
            response.json(res)
        }).catch(error => {
            response.status(500).send({
                status: false,
                msg: __('mwssages').internal_server_error
            })
        })
    }
};
