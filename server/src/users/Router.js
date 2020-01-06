const {Router} = require('express');
const router = Router();
const User = require('./UserController');
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const UsersMiddleware = require("../../middleware/UsersMiddelware");

let LoginRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 minute window
    max: 5, // start blocking after 5 requests,
});


router.post('/register', User.register_user);
router.post('/login', LoginRateLimit , User.loginToAccount , passport.authenticate('local') , (req , res) => { res.json({status : true}) } );
router.post('/get/me' , UsersMiddleware.check_login_user , User.get_user);
router.get('/email-validate/:token', User.check_and_validate_email);

/* FORGET PASSWORD */
router.post('/forget/find', User.fetchUserForForgetPassword);
router.post('/forget/send', User.checkTokenDeviceAndSendLinkForgetPassword);
router.get('/forget-password-check-link/:token', User.check_and_validate_link_forget_password);
router.put('/password/change', User.change_password_with_token);

module.exports = router;
