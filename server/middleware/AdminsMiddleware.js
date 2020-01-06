const jwt = require('../util/jwt/index');

module.exports = {
    check_jwt(req, res, next) {
        let token = req.headers.authorization || undefined;

        if (token) {
            token = token.replace('Bearer ', '');

            let check = jwt.verify(token);
            if (check.error) {
                return res.status(401).json({status: false, msg: 'access token not valid'});
            } else {
                req.user_data = check.payload;
                next();
            }

        } else return res.status(401).json({status: false, msg: 'access token is required'});
    },
};
