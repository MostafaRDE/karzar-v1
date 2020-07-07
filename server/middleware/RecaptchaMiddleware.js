"use strict";
let request = require('request');

module.exports = {
    checkGoogleRecaptcha(req, res, next) {
        if (!req.body['g-recaptcha-response'] || req.body['g-recaptcha-response'] === '') {
            return res.status(400).json({
                status: false,
                msg: __('messages').errors.please_confirm_that_you_are_not_a_robot_first,
            })
        }

        // req.connection.remoteAddress will provide IP address of connected user.
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_V2_SECRET_KEY}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;

        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl,function(error, response, body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if(body.success !== undefined && !body.success) {
                return res.status(422).json({
                    status: false,
                    msg: '',
                });
            }
            return next();
        });
    }
};
