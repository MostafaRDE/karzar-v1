const request = require('request');

class Zibal {
    static init(config) {
        Zibal.updateConfig(config)
    }

    static updateConfig({merchant, callbackUrl, logLevel = process.env.NODE_ENV === 'production' ? 0 : 2}) {
        Zibal.config = {
            merchant,
            callbackUrl,
            logLevel,
            // 0: none
            // 1: error
            // 2: error + info
        }
    }

    static request(amount, extras) {
        const { isConfigValid, config, errors, extractExtras, post, log, error } = Zibal;
        return new Promise((resolve, reject) => {
            if (!isConfigValid) {
                reject(errors.invalidConfig);
                return
            }
            const { merchant, callbackUrl } = config;
            const data = {
                merchant,
                callbackUrl,
                amount: parseInt(amount),
                ...extractExtras(extras),
            };
            post('request', data, (err, res, body) => {
                log('statusCode:', res.statusCode);
                log('headers:', res.headers);
                if (err) {
                    error('REQUEST ENDPOINT FAILED:', err);
                    log('DETAILS:', res);
                    reject(err)
                } else {
                    log("REQUEST SUCCESSFUL:\n", JSON.stringify(body, null, 4));
                    let statusMessage = null;
                    switch (body.result) {
                        case 100:
                            statusMessage = __('messages').successes.successfully_approved;
                            break;
                        case 102:
                            statusMessage = __('gateways').errors.merchant_not_found;
                            break;
                        case 103:
                            statusMessage = __('gateways').errors.merchant_disabled;
                            break;
                        case 104:
                            statusMessage = __('gateways').errors.merchant_invalid;
                            break;
                        case 201:
                            statusMessage = __('messages').infos.previously_confirmed;
                            break;
                        case 105:
                            statusMessage = __('gateways').errors.the_amount_must_be_larger_than_1000_rials;
                            break;
                        case 106:
                            statusMessage = __('gateways').errors.callback_url_is_invalid__start_with_http_or_https__;
                            break;
                    }
                    resolve({
                        ...body,
                        statusMessage,
                    })
                }
            })
        })
    }

    static startURL(trackId) {
        return `${Zibal.api.start}${trackId}`
    }

    static verify(trackId) {
        const { isConfigValid, config, post, log, error } = Zibal;
        return new Promise((resolve, reject) => {
            !isConfigValid && reject();
            const { merchant } = config;
            const data = {
                trackId,
                merchant,
            };
            post('verify', data, (err, res, body) => {
                log('statusCode:', res.statusCode);
                log('headers:', res.headers);
                if (err) {
                    error('VERIFY ENDPOINT FAILED:', err);
                    log('DETAILS:', res);
                    reject(err)
                } else {
                    log("VERIFY SUCCESSFUL:\n", JSON.stringify(body, null, 4));
                    let statusMessage = null;
                    switch (body.result) {
                        case 100:
                            statusMessage = __('messages').successes.successfully_approved;
                            break;
                        case 102:
                            statusMessage = __('gateways').errors.merchant_not_found;
                            break;
                        case 103:
                            statusMessage = __('gateways').errors.merchant_disabled;
                            break;
                        case 104:
                            statusMessage = __('gateways').errors.merchant_invalid;
                            break;
                        case 201:
                            statusMessage = __('messages').infos.previously_confirmed;
                            break;
                        case 202:
                            statusMessage = __('gateways').errors.the_amount_must_be_larger_than_1000_rials;
                            break;
                        case 203:
                            statusMessage = __('gateways').errors.callback_url_is_invalid__start_with_http_or_https__;
                            break
                    }
                    resolve({
                        ...body,
                        statusMessage,
                    })
                }
            })
        })
    }

    // private
    static extractExtras(obj) {
        return obj ? Zibal.extraProperties.reduce((a, c) => ({ ...a, [c]: obj[c] }), {}) : {}
    }

    // private
    static post(path, body, callback) {
        const { api, log } = Zibal;
        const uri = `${api.base}${path}`;
        log(`POST: \n${JSON.stringify(body, null, 4)}\nTO: ${uri}`);
        request.post(uri, {
            uri,
            json: true,
            body,
        }, callback)
    }

    // private
    static get isConfigValid() {
        const { config, errors, error } = Zibal;
        const isValid = config && config.merchant && config.callbackUrl;
        !isValid && error(errors.invalidConfig);
        return isValid
    }

    // private
    static log(...args) {
        const { config } = Zibal;
        config.logLevel > 1 && console.log(`==== Zibal - info - ${Date.now()} -`, ...args)
    }

    // private
    static error(...args) {
        const { config } = Zibal;
        config.logLevel > 0 && console.error(`==== Zibal - info - ${Date.now()} -`, ...args)
    }
}

// private
Zibal.config = {};

// private
Zibal.api = {
    base: 'https://gateway.zibal.ir/v1/',
    start: 'https://gateway.zibal.ir/start/',
};

Zibal.extraProperties = [
    'mobile',
    'description',
    'multiplexingInfos',
    'feeMode',
    'percentMode',
];

Zibal.errors = {
    invalidConfig: 'Invalid Configuration',
};

module.exports = Zibal;
