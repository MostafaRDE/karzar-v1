const {Router} = require('express');
const router = Router();
const UsersMiddleware = require("../../middleware/UsersMiddelware");
const Storage = require('../../util/multer/image-identity-storage');

// <editor-fold desc="Transactions">

const transactionsController = require('./Transactions/Controller');

router.get('/transactions', UsersMiddleware.check_login_user, transactionsController.index);
router.post('/transactions', UsersMiddleware.check_login_user, Storage.single('file'), transactionsController.store);

// </editor-fold>

// <editor-fold desc="Callbacks">

const callbacksController = require('./Callbacks/Controller');

router.get('/callback/:gateway', UsersMiddleware.check_login_user, callbacksController.index);

// </editor-fold>

// <editor-fold desc="Wallet Transactions">

const walletTransactionsController = require('./WalletTransactions/Controller');

router.get('/wallet-transactions', UsersMiddleware.check_login_user, walletTransactionsController.index);

// </editor-fold>

module.exports = router;
