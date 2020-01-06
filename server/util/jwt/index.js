const fs = require('fs');
const jsonWebToken = require("jsonwebtoken");

module.exports = {
    create({payload, expire}) {
        // private key and public key
        const privateKey = fs.readFileSync('./server/util/private/private.key', 'utf8');

        let encodeOptions = {};

        // add expire
        if (!expire)
            encodeOptions.expiresIn = '12h';
        else
            encodeOptions.expiresIn = expire;

        // algorithm
        encodeOptions.algorithm = 'RS256';

        return jsonWebToken.sign(payload, privateKey, encodeOptions);
    },
    verify(token) {
        const publicKey = fs.readFileSync('./server/util/private/public.key', 'utf8');
        try {
            const verify = jsonWebToken.verify(token, publicKey);
            return {error: false, payload: verify};
        } catch (e) {
            return {error: true, payload: e.name};
        }
    }
};
