"use strict";

const help = require('../util/helper/functions');
const handlebars = require('handlebars');
const mailgun = require('../util/mails/mailgun');

class MailServices {

    constructor({to_address , from_address_mode , subject , lang ,  template_address}) {
        this._to_address = to_address;
        this._subject = subject;
        this._lang = lang;
        this.set_from_address(from_address_mode);
        this._action_template = template_address;
    }

    set_from_address( from_mode ) {
        if (from_mode === 'INFO') {
            this._from_email = `Info ${process.env.WEBSITE_TITLE} <info@${process.env.DOMAIN_NAME}>`
        }else if (from_mode === 'SUPPORT') {
            this._from_email = "support@" + process.env.DOMAIN_NAME
        }
    }

    render_template( data_render ) {
        return new Promise((resolve, reject) => {
            help.readHTMLFile(this._action_template, function (err, html) {
                if (err) reject(err);

                var template = handlebars.compile(html);
                var replacements = data_render;

                let htmlCompile = template(replacements);
                resolve(htmlCompile);
            })
        })
    }

    sendMail( dataPass ) {
        this.render_template(dataPass).then(html => {

            let dataObjectSend = {
                from : this._from_email,
                to : this._to_address,
                subject : this._subject,
                html
            };
            mailgun.messages().send(dataObjectSend , (err , body) => {
                console.log(err , 'mail sender');
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = MailServices;