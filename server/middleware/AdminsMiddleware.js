const {AdminModel} = require("../Models/AdminModel");
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
                let admin = new AdminModel()
                req.user_data = check.payload;
                next();
            }

        } else return res.status(401).json({status: false, msg: 'access token is required'});
    },

    check_roles(roles) {
        return function (req, res, next) {
            if (roles.includes(req.user_data.role))
                next();
            else
                return res.status(403).json({status: false, msg: 'access denied'})
        }
    },
};
