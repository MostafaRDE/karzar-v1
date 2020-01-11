const Actions = require('./Actions');
const validator = require("validator");

module.exports = {

    /**
     * @api POST admin/add
     *
     * @param req
     * @param res
     * @returns {*}
     */
    add(req, res) {
        let name = req.body.name || undefined;
        let email = req.body.email || undefined;
        let username = req.body.username || undefined;
        let password = req.body.password || undefined;

        if (!name || !email || !username || !password) {
            return res.status(422).json({status: false, msg: __('messages').err_empty_required_filed});
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({error: -400, msg: __('messages').err_email_filed})
        }

        new Actions()
            .add(name, email, username, password, 1)
            .then(data => {
                if (data.status) {
                    return res.status(200).json({status: true});
                } else {
                    return res.status(422).json({status: false, msg: data.msg});
                }
            })
            .catch(err => {
                return res.status(500).json({status: false, msg: __('errors').error_500});
            })
    },

    login(request, response) {
        let username = request.body.username || undefined;
        let password = request.body.password || undefined;
        let googleCodeAuthenticator = request.body.g_code || undefined;

        if (!username || !password) {
            return res.status(400).json({status: false, msg: 'فیلد های الزامی را وارد نمایید'})
        }

        let {os, browser, version, platform, isMobile, isDesktop} = request.useragent;


        new Actions()
            .login({
                username,
                password,
                googleCodeAuthenticator,
                ip: request.connection.remoteAddress,
                user_agent: {os, browser, version, platform, isMobile, isDesktop}
            })
            .then(data => {
                if (data.status) {
                    return response.status(200).json({status: true, access_token: data.access_token})
                } else {
                    return response.status(422).json({status: false, msg: data.msg})
                }
            })
            .catch(err => {
                return response.status(500).json({status: msg.error_500})
            })
    },
};
