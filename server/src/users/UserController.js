"use strict";

const validator = require("validator");
const UserActions = require('./Actions');
const {UserLoginHistory} = require("./UserMongo");

module.exports = {

    /**
     * @api users/register
     * this is a register user
     * ) insert if not exist
     * ) send email validate email
     * @param req
     * @param res
     * @returns {*|void|undefined|Promise<any>}
     */
    register_user(req, res) {

        let email = req.body.email;
        let password = req.body.password;
        let whatsapp_number = req.body.whatsapp_number;
        let refer_code = req.body.refer_code;

        if (!email || !password || !whatsapp_number) {
            return res.status(400).json({error: -400, msg: __('messages').err_empty_required_filed})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({error: -400, msg: __('messages').err_email_filed})
        }

        email = validator.normalizeEmail(email, {gmail_remove_dots: false});

        if (refer_code) {
            refer_code = validator.escape(refer_code);
        } else {
            refer_code = null
        }

        let userActions = new UserActions();
        userActions.addAccount({email, password, whatsapp_number, refer_code, lang: req.query.lang})
            .then(data => {
                if (data.status) {
                    if (data.is_email_send) {
                        return res.status(200).json({status: true});
                    }
                } else {
                    return res.status(422).json({error: -422, msg: data.msg})
                }
            })
            .catch(() => {
                return res.status(500).json({error: -500})
            });
    },

    /**
     * @api users/email-validate/:token
     * this is a check validate email
     * @param req
     * @param res
     * @returns {*}
     */
    check_and_validate_email(req, res) {
        let token = req.params.token || null;

        /* چک کردن درست بودن کد هش شده */
        if (!validator.isHash(token, 'sha1')) {
            return res.redirect(`/${req.query.lang}/404`)
        }

        let userActions = new UserActions();
        userActions.validate_email_by_token(token)
            .then(data => {
                if (data.status) {
                    return res.redirect(`/${req.query.lang}/emails/validate/ok`)
                } else {
                    if (data.error === 404) {
                        return res.redirect(`/${req.query.lang}/404`)
                    } else if (data.error === 422) {
                        return res.redirect(`/${req.query.lang}/emails/validate/expire`)
                    } else if (data.error === 403) {
                        return res.redirect(`/${req.query.lang}/emails/validate/blocked`)
                    }
                }
            })
            .catch(() => {
                return res.status(500).json({error: -500, msg: "Internal Server Error"});
            });
    },

    /**
     * @api users/login
     * this is a validate email by token
     * @param request
     * @param response
     * @param next
     * @returns {Promise<*>}
     */
    async loginToAccount(request, response, next) {
        if (!request.body.email || !request.body.password) {
            return response.status(400).json({error: -400, msg: __('messages').err_empty_required_filed});
        }

        if (!validator.isEmail(request.body.email)) {
            return response.status(400).json({error: -400, msg: __('messages').err_email_filed});
        }

        let {email, password} = request.body;

        email = validator.normalizeEmail(email, {gmail_remove_dots: false});

        let {os, browser, version, platform, isMobile, isDesktop} = request.useragent;

        let userActions = new UserActions();
        userActions.loginToAccount(email, password)
            .then(async data => {
                if (data.status) {

                    request.user_data = data.data;

                    let userLoginHistory = new UserLoginHistory({
                        user: request.user_data.id,
                        ip: request.connection.remoteAddress,
                        useragent: {os, browser, version, platform, isMobile, isDesktop},
                    });

                    try {
                        await userLoginHistory.save();
                    } catch (e) {
                        console.log('e', e);
                    }

                    next();

                } else {
                    return response.status(422).json({error: -422, msg: data.msg});
                }
            })
            .catch(err => {
                console.log('error', err);
                return response.status(500).json({error: -500, msg: "Internal Server Error"});
            });
    },

    /**
     * this is a fetch user for forget password
     * @param request
     * @param response
     * @returns {*}
     */
    fetchUserForForgetPassword(request, response) {
        if (!request.body.username) {
            return response.status(400).json({error: -400, msg: __('messages').err_empty_required_filed});
        }

        let {username} = request.body;

        if (!validator.isEmail(username)) {
            if (!validator.isMobilePhone(username, 'fa-IR')) {
                return response.status(400).json({error: -400, msg: __('messages').invalid_username});
            }
        } else {
            username = validator.normalizeEmail(username, {gmail_remove_dots: false});
        }

        let userActions = new UserActions;
        userActions.FindUserDeviceForForgetPassword(request.body.username)
            .then(data => {
                if (data.status) {
                    return response.status(200).json({status: true, data: data.values});
                } else {
                    return response.status(422).json({error: -422, msg: data.msg});
                }
            })
            .catch(() => {
                return response.status(500).json({error: -500});
            })

    },

    /**
     * This is a forget password
     * @param request
     * @param response
     * @returns {*}
     */
    checkTokenDeviceAndSendLinkForgetPassword(request, response) {
        if (!request.body.token) {
            return response.status(400).json({error: -400, msg: __('message').err_empty_required_filed});
        }

        let userActions = new UserActions;
        userActions.CheckDeviceTokenSendLinkForgetPassword(request.body.token, request.connection.remoteAddress, request.query.lang)
            .then(data => {
                if (data.status) {
                    return response.status(200).json({status: true, data: data.values});
                } else {
                    return response.status(422).json({error: -422, msg: data.msg});
                }
            })
            .catch(err => {
                console.log(err);
                return response.status(500).json({error: -500});
            });

    },

    /**
     * This api for valid link forget password
     * @param req
     * @param res
     * @returns {*}
     */
    check_and_validate_link_forget_password(req, res) {
        let token = req.params.token || null;

        /* چک کردن درست بودن کد هش شده */
        if (!validator.isHash(token, 'sha1')) {
            return res.redirect(`/${req.query.lang}/404`)
        }

        let userActions = new UserActions();
        userActions.ValidTokenAllowChangePassword({token, ip: req.connection.remoteAddress})
            .then(data => {
                if (data.status) {
                    return res.redirect(`/${req.query.lang}/password/change?token=${data.token}`)
                } else {
                    if (data.code === -1) {
                        return res.redirect(`/${req.query.lang}/password/error/ip`)
                    } else if (data.code === -2) {
                        return res.redirect(`/${req.query.lang}/password/error/expire`)
                    } else {
                        return res.redirect(`/${req.query.lang}/404`)
                    }
                }
            })
            .catch(() => {
                return res.redirect('/en/500')
            });
    },

    /**
     * This is a change password with token link
     * @request PUT /password/change
     * @param request
     * @param response
     * @returns {*}
     */
    change_password_with_token(request, response) {
        if (!request.body.token || !request.body.password) {
            return response.status(400).json({status: false, msg: __('messages').err_empty_required_filed});
        }

        UserActions.change_password_by_token({
            token: request.body.token,
            password: request.body.password,
            ip: request.connection.remoteAddress
        })
            .then(data => {
                if (data.status) {
                    return response.status(200).json({success: true})
                } else {
                    return response.status(422).json({success: false, msg: data.msg})
                }
            })
            .catch(err => {
                console.log('error', err);
                return response.status(500).json({success: false})
            })

    },

    get_user(req, res) {
        res.json(req.user)
    },

    updateProfile(req, res) {
        UserActions.editUser(req.body, ['id'], req.user.id).then(response => {
            res.json(response)
        }).catch(error => {
            res.status(422).send(error)
        })
    },

    updatePassword(req, res) {
        UserActions.updatePassword(
            req.body.current_password,
            req.body.new_password,
            req.user.id
        ).then(response => {
            res.json(response)
        }).catch(error => {
            res.status(500).send(error)
        })
    },

    getBalance(req, res) {
        UserActions.getBalance(req.user.id).then(response => {
            res.json(response)
        }).catch(error => {
            res.status(500).send(error)
        })
    },
};
