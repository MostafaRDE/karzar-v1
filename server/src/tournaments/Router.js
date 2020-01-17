const {Router: Router} = require('express');
const router = Router();
const UsersMiddleware = require("../../middleware/UsersMiddelware");

// <editor-fold desc="PUBG">

const pubgController = require('./PUBG/Controller');

router.get('/pubg', pubgController.index);
router.get('/pubg/last', pubgController.last);
router.get('/pubg/running', pubgController.runningTournaments);
router.get('/pubg/:id/players', pubgController.players);
router.post('/pubg/:id/enter', UsersMiddleware.check_login_user, pubgController.enter);
router.get('/pubg/my-tours', UsersMiddleware.check_login_user, pubgController.myTournaments);

// </editor-fold>

module.exports = router;
