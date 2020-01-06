const RateLimiter = require('express-rate-limit');

module.exports = function (app) {
    const limiter = new RateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minute
        max: 100, // limit of number for ip request
        delayMs: 0, // disable delays
    });
    // app.use(limiter);
};