"use strict";

module.exports = {
    check_login_user(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.status(401).json({error: 401, msg: 'Unauthorized'})
        }
    }
};
