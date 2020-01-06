const Actions = require('./Actions');

function getTranslates (key) {
    return new Promise((resolve, reject) => {
        let actions = new Actions();
        actions.getTranslates(key).then(data => resolve(data)).catch(reject);
    });
}

function translate (key, keyLang = 'en') {
    return new Promise((resolve, reject) => {
        let actions = new Actions();
        actions.translate(key, keyLang).then(data => resolve(data)).catch(reject);
    });
}

function store (key, value , keyLang = 'en') {
    return new Promise((resolve, reject) => {
        let actions = new Actions();
        actions.store(key, keyLang, value).then(data => resolve(data)).catch(reject);
    });
}

function update(key, value , keyLang = 'en') {
    return new Promise(async (resolve, reject) => {
        let actions = new Actions();
        if (await translate(key, keyLang) !== null)
            actions.update(key, keyLang, value).then(data => resolve(data)).catch(reject);
        else
            actions.store(key, keyLang, value).then(data => resolve(data)).catch(reject);
    });
}

module.exports.getTranslates = getTranslates;
module.exports.translate = translate;
module.exports.store = store;
module.exports.update = update;
