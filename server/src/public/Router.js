const {Router} = require('express');
const router = Router();
const Controller = require('./Controller');
const {checkGoogleRecaptcha} = require("../../middleware/RecaptchaMiddleware");

router.get('/:key', Controller.getPublicContent);
router.post('/contact', checkGoogleRecaptcha, Controller.storeContact);

module.exports = router;
