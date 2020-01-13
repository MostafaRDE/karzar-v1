const {Router: Router} = require('express');
const router = Router();

const Controller = require('./Controller');

router.get('/', Controller.index);

module.exports = router;
