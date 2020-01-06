var crypto = require('crypto');
var validator = require('validator');

function microtime(getAsFloat = false) {
    let s, now;

    if(typeof performance !== 'undefined' && performance.now) {
        now = (performance.now() + performance.timing.navigationStart) / 1000;
    }
    else {
        now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
    }

    // Getting microtime as a float is easy
    if(getAsFloat) {
        return now;
    }

    // Dirty trick to only get the integer part
    s = now | 0;

    return s;
}

function authorize(permission, userData) {
    return userData.role === 'SUPER_ADMIN' || userData.permissions.includes(permission)
}

function parser(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    if (str) {
        return str.toString().replace(/%s/g, () => args[i++]);
    }else {
        return ""
    }
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function readHTMLFile(path, callback) {
    require('fs').readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
        } else {
            callback(null, html);
        }
    });
}

function randomStr(howMany, chars) {
    chars = chars
        || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    let rnd = crypto.randomBytes(howMany);
    let value = new Array(howMany);
    let len = Math.min(256, chars.length);
    let d = 256 / len;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[Math.floor(rnd[i] / d)]
    }

    return value.join('');
}

function just_persian(str) {
    var p = /^[\u0600-\u06FF\s]+$/;
    return p.test(str);

}

/**
 * @return {boolean}
 */
function NationalCode(input) {
    if (!/^\d{10}$/.test(input)
        || input.toString() === '0000000000'
        || input.toString() === '1111111111'
        || input.toString() === '2222222222'
        || input.toString() === '3333333333'
        || input.toString() === '4444444444'
        || input.toString() === '5555555555'
        || input.toString() === '6666666666'
        || input.toString() === '7777777777'
        || input.toString() === '8888888888'
        || input.toString() === '9999999999')
        return false;
    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
        sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}

function normalize_param(p) {
    p = validator.escape(p);
    p = validator.trim(p);
    p = validator.ltrim(p);
    p = validator.rtrim(p);
    p = validator.blacklist(p);

    return p;
}

function fixed_digit(number, fixed) {
    var split = number.toString().split('.');
    var response = split[0];

    if (fixed > 0) {
        if (split[1] && split[1].length > 0) {
            response += ".";
            response += split[1].substr(0, fixed);
        }
    }

    return response;
}

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

module.exports = {
    microtime,
    authorize,
    parser,
    sleep,
    readHTMLFile,
    randomStr,
    just_persian,
    NationalCode,
    normalize_param,
    fixed_digit,
    isEmpty,
};
