const mailgunjs = require("mailgun-js");

const DOMAIN = process.env.MAILGUN_DOMAIN_NAME;
const API_KEY = process.env.MAILGUN_API_KEY;

const mailgun = mailgunjs({apiKey: API_KEY, domain: DOMAIN});

module.exports = mailgun;