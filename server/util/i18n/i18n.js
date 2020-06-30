const i18n = require('i18n');

module.exports = (app) => {
    i18n.configure({
        locales:['en', 'fa'],
        queryParameter: 'lang',
        directory: './server/util/i18n/locales',
        register : global
    });

    app.use(i18n.init);
};
