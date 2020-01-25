const {Router} = require('express');
const router = Router();
const UsersMiddleware = require("../../middleware/UsersMiddelware");
const Storage = require('../../util/multer/image-identity-storage');

// <editor-fold desc="Transactions">

const gatewaysController = require('./Gateways/Controller');
const transactionsController = require('./Transactions/Controller');

router.get('/gateways', gatewaysController.index);
router.get('/transactions', UsersMiddleware.check_login_user, transactionsController.index);
router.post('/transactions', UsersMiddleware.check_login_user, Storage.single('file'), transactionsController.store);

// </editor-fold>

// <editor-fold desc="Wallet Transactions">

const walletTransactionsController = require('./WalletTransactions/Controller');

router.get('/wallet-transactions', UsersMiddleware.check_login_user, walletTransactionsController.index);

// </editor-fold>

module.exports = router;
