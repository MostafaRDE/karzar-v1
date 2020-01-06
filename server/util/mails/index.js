"use strict";

const MailServices = require('../../services/MailServices');
const crypto = require('crypto');
const moment = require('moment');
const {UserTokens} = require('../../src/users/UserMongo');

module.exports = {
    /**
     * Send Mail Validate Email
     * ) create token hash
     * ) save to db mongo and table UserTokens
     * ) End Send Token Hash for user
     * @param user_id
     * @param to_address
     * @param lang
     * @returns {Promise<any>}
     */
    send_valid_email_address(user_id, to_address, lang) {
        return new Promise((resolve, reject) => {
            // create hash code
            let current_date = (new Date()).valueOf().toString();
            let random = Math.random().toString();
            let hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
            let template_address = process.cwd() + '/server/util/mails/templates/validate_email.html';

            // save to mongo db
            let ut = new UserTokens({
                user: user_id,
                email_address: to_address,
                token: hash,
                expired_at: moment(moment().format()).add(2, 'hours').format(),
                status: "NEW",
                mode : "VALID_EMAIL"
            });

            ut.save()
                .then(() => {
                    let mail = new MailServices({
                        to_address,
                        from_address_mode: "INFO",
                        subject: __('emails').email_validate.subject,
                        template_address
                    });

                    mail.sendMail({
                        email: to_address,
                        link_validate: `${process.env.DOMAIN_USE}/api/v1/users/email-validate/${hash}?lang=${lang}`,
                    });

                })
                .catch(reject);

            resolve(hash);

        });
    },

    /**
     * This is a send link validation forget password
     * @param to_address
     * @param user_id
     * @param ip
     * @param lang
     * @returns {Promise<any>}
     */
    send_forget_password_link( to_address , user_id  , ip, lang) {
        return new Promise((resolve , reject) => {
            // create hash code
            let current_date = (new Date()).valueOf().toString();
            let random = Math.random().toString();
            let hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
            let template_address = process.cwd() + '/server/util/mails/templates/forget_password.html';


            // save to mongo db
            let ut = new UserTokens({
                user: user_id,
                email_address: to_address,
                token: hash,
                ip: ip,
                expired_at: moment(moment().format()).add(2, 'hours').format(),
                mode : "VALID_PASSWORD"
            });

            ut.save()
                .then(() => {
                    let mail = new MailServices({
                        to_address,
                        from_address_mode: "INFO",
                        subject: __('emails').email_validate.subject,
                        template_address
                    });

                    mail.sendMail({
                        email: to_address,
                        link_validate: `${process.env.DOMAIN_USE}/api/v1/users/forget-password-check-link/${hash}?lang=${lang}`,
                    });

                })
                .catch(reject);

            resolve(hash);
        });
    },
};
