const {Router} = require('express');
const router = Router();
const adminMiddleware = require("../../middleware/AdminsMiddleware");
const Storage = require('./../../util/multer/image-identity-storage');

// <editor-fold desc="Admin routes">
const Controller = require('./Controller');

router.post('/login' , Controller.login);

constAdminController = require('./Admins/Controller');

router.get('/permissions', adminMiddleware.check_jwt, constAdminController.permissions);
router.get('/admins', adminMiddleware.check_jwt, constAdminController.index);
router.post('/admins', adminMiddleware.check_jwt, constAdminController.store);
router.put('/admins/:id', adminMiddleware.check_jwt, constAdminController.update);
router.put('/admins/:id/2fa', adminMiddleware.check_jwt, constAdminController.update2fa);
router.put('/admins/:id/password', adminMiddleware.check_jwt, constAdminController.updatePassword);
router.put('/admins/:id/permissions', adminMiddleware.check_jwt, constAdminController.updatePermissions);
router.delete('/admins/:id/block', adminMiddleware.check_jwt, constAdminController.block);
router.put('/admins/:id/unblock', adminMiddleware.check_jwt, constAdminController.unblock);

// <editor-fold desc="Admin routes">

router.put('/profile/change-password', adminMiddleware.check_jwt, constAdminController.profileUpdatePassword);

// </editor-fold>

// </editor-fold>

// <editor-fold desc="Users">

const UsersController = require('./Users/Controller');

router.get('/users', adminMiddleware.check_jwt, UsersController.index);
router.post('/users', adminMiddleware.check_jwt, UsersController.store);
router.get('/users/:id', adminMiddleware.check_jwt, UsersController.show);
router.put('/users/:id', adminMiddleware.check_jwt, Storage.array('image'), UsersController.update);
router.delete('/users/:id/block', adminMiddleware.check_jwt, UsersController.block);
router.post('/users/:id/unblock', adminMiddleware.check_jwt, UsersController.unblock);
router.post('/users/:id/create-wallet', adminMiddleware.check_jwt, UsersController.createWallet);
router.put('/users/:id/update-password', adminMiddleware.check_jwt, UsersController.updatePassword);

// </editor-fold>

// <editor-fold desc="Sliders routes">
const SliderController = require('./Sliders/Controller');
const SliderItemController = require('./Sliders/SliderItems/Controller');

router.get('/sliders', adminMiddleware.check_jwt, SliderController.index);
router.post('/sliders/store', adminMiddleware.check_jwt, SliderController.store);
router.get('/sliders/:id', adminMiddleware.check_jwt, SliderItemController.index);
router.post('/sliders/:id/store', adminMiddleware.check_jwt, Storage.array('image'), SliderItemController.store);
// </editor-fold>

// <editor-fold desc="Games routes">

// Maps
const PubgMapsController = require('./Games/PUBG/Maps/Controller');
router.get('/games/pubg/maps', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgMapsController.index);
router.post('/games/pubg/maps', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), Storage.array('image'), PubgMapsController.store);
router.get('/games/pubg/maps/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgMapsController.show);
router.put('/games/pubg/maps/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), Storage.array('image'), PubgMapsController.update);
router.delete('/games/pubg/maps/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgMapsController.destroy);

// Tournaments
const PubgTournamentsController = require('./Games/PUBG/Tournaments/Controller');
router.get('/games/pubg/tournaments', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.index);
router.post('/games/pubg/tournaments', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.store);
router.get('/games/pubg/tournaments/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.show);
router.put('/games/pubg/tournaments/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.update);
router.put('/games/pubg/tournaments/:id/end', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.end);
router.put('/games/pubg/tournaments/:id/clear-end', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.clearEnd);
router.put('/games/pubg/tournaments/:id/set-winner-team', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.setWinnerTeam);
router.get('/games/pubg/tournaments/:id/players', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.players);
router.put('/games/pubg/tournaments/:id/players', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.updatePlayers);
router.put('/games/pubg/tournaments/:id/players/:player_id/add-room-details', adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), adminMiddleware.check_jwt, PubgTournamentsController.addAuthenticationRoomToGroupPlayers);
router.put('/games/pubg/tournaments/:id/players/:player_id/remove-room-details', adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), adminMiddleware.check_jwt, PubgTournamentsController.removeAuthenticationRoomToGroupPlayers);
router.delete('/games/pubg/tournaments/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), PubgTournamentsController.destroy);

// </editor-fold>

// <editor-fold desc="Payments">

// Gateways
const GatewaysController = require('./Gateways/Controller');
router.get('/gateways', adminMiddleware.check_jwt, GatewaysController.index);
router.post('/gateways', adminMiddleware.check_jwt, Storage.array('image'), GatewaysController.store);
router.put('/gateways/:id', adminMiddleware.check_jwt, Storage.array('image'), GatewaysController.update);

// Transactions
const PaymentsTransactionsController = require('./Payments/Transactions/Controller');
router.get('/payments/transactions', adminMiddleware.check_jwt, PaymentsTransactionsController.index);
router.post('/payments/transactions', adminMiddleware.check_jwt, PaymentsTransactionsController.store);
router.get('/payments/transactions/:id', adminMiddleware.check_jwt, PaymentsTransactionsController.show);
router.put('/payments/transactions/:id', adminMiddleware.check_jwt, PaymentsTransactionsController.update);
router.put('/payments/transactions/:id/amount', adminMiddleware.check_jwt, PaymentsTransactionsController.updateAmount);
router.put('/payments/transactions/:id/status', adminMiddleware.check_jwt, PaymentsTransactionsController.updateStatus);

// Wallets
const PaymentsWalletsController = require('./Payments/Wallets/Controller');
router.get('/payments/wallets', adminMiddleware.check_jwt, PaymentsWalletsController.index);
router.get('/payments/wallets/:id', adminMiddleware.check_jwt, PaymentsWalletsController.show);
router.put('/payments/wallets/:id', adminMiddleware.check_jwt, PaymentsWalletsController.update);

// </editor-fold>

// <editor-fold desc="Tutorials">

const TutorialsController = require('./Tutorials/Controller');
router.get('/tutorials', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), TutorialsController.index);
router.post('/tutorials', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), Storage.array('image'), TutorialsController.store);
router.put('/tutorials/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), Storage.array('image'), TutorialsController.update);
router.delete('/tutorials/:id', adminMiddleware.check_jwt, adminMiddleware.check_roles(['SUPER_ADMIN', 'EXECUTOR']), TutorialsController.destroy);

// </editor-fold>

module.exports = router;
