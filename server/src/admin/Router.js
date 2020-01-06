const {Router} = require('express');
const router = Router();
const adminMiddleware = require("../../middleware/AdminsMiddleware");
const Storage = require('./../../util/multer/image-identity-storage');

// <editor-fold desc="Admin routes">
const Controller = require('./Controller');

router.post('/add' , Controller.add);
router.post('/login' , Controller.login);
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
router.get('/games/pubg/maps', adminMiddleware.check_jwt, PubgMapsController.index);
router.post('/games/pubg/maps', adminMiddleware.check_jwt, Storage.array('image'), PubgMapsController.store);
router.get('/games/pubg/maps/:id', adminMiddleware.check_jwt, PubgMapsController.show);
router.put('/games/pubg/maps/:id', adminMiddleware.check_jwt, Storage.array('image'), PubgMapsController.update);
router.delete('/games/pubg/maps/:id', adminMiddleware.check_jwt, PubgMapsController.destroy);

// Tournaments
const PubgTournamentsController = require('./Games/PUBG/Tournaments/Controller');
router.get('/games/pubg/tournaments', adminMiddleware.check_jwt, PubgTournamentsController.index);
router.post('/games/pubg/tournaments', adminMiddleware.check_jwt, PubgTournamentsController.store);
router.get('/games/pubg/tournaments/:id', adminMiddleware.check_jwt, PubgTournamentsController.show);
router.put('/games/pubg/tournaments/:id', adminMiddleware.check_jwt, PubgTournamentsController.update);
router.get('/games/pubg/tournaments/:id/players', adminMiddleware.check_jwt, PubgTournamentsController.players);
router.put('/games/pubg/tournaments/:id/players/:player_id/add-room-details', adminMiddleware.check_jwt, PubgTournamentsController.addAuthenticationRoomToGroupPlayers);
router.put('/games/pubg/tournaments/:id/players/:player_id/remove-room-details', adminMiddleware.check_jwt, PubgTournamentsController.removeAuthenticationRoomToGroupPlayers);
router.delete('/games/pubg/tournaments/:id', adminMiddleware.check_jwt, PubgTournamentsController.destroy);

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
router.put('/payments/transactions/:id/status', adminMiddleware.check_jwt, PaymentsTransactionsController.updateStatus);

// Wallets
const PaymentsWalletsController = require('./Payments/Wallets/Controller');
router.get('/payments/wallets', adminMiddleware.check_jwt, PaymentsWalletsController.index);
router.get('/payments/wallets/:id', adminMiddleware.check_jwt, PaymentsWalletsController.show);
router.put('/payments/wallets/:id', adminMiddleware.check_jwt, PaymentsWalletsController.update);

// </editor-fold>

module.exports = router;
