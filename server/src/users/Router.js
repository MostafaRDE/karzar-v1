const {Router} = require('express');
const router = Router();
const User = require('./UserController');
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const UsersMiddleware = require("../../middleware/UsersMiddelware");
const Storage = require('./../../util/multer/image-identity-storage');
const {checkGoogleRecaptcha} = require("../../middleware/RecaptchaMiddleware");

let LoginRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 minute window
    max: 5, // start blocking after 5 requests,
});


router.post('/register', checkGoogleRecaptcha, User.register_user);
router.post('/login', LoginRateLimit, checkGoogleRecaptcha, User.loginToAccount, passport.authenticate('local'), (req, res) => {
    res.json({status : true});
} );
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(`/${req.query.lang || ''}`);
} );
router.get('/get/me' , UsersMiddleware.check_login_user , User.get_user);
router.put('/update-profile' , UsersMiddleware.check_login_user , Storage.single('profile_image') , User.updateProfile);
router.put('/update-password' , UsersMiddleware.check_login_user , User.updatePassword);
router.get('/email-validate/:token', User.check_and_validate_email);
router.get('/balance', UsersMiddleware.check_login_user, User.getBalance);

/* FORGET PASSWORD */
router.post('/forget/find', checkGoogleRecaptcha, User.fetchUserForForgetPassword);
router.post('/forget/send', User.checkTokenDeviceAndSendLinkForgetPassword);
router.get('/forget-password-check-link/:token', User.check_and_validate_link_forget_password);
router.put('/password/change', User.change_password_with_token);

module.exports = router;
