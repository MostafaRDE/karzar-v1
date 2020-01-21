const {Router} = require('express');
const router = Router();
const Controller = require('./Controller');

router.get('/:key', Controller.getPublicContent);
router.post('/contact', Controller.storeContact);

module.exports = router;
