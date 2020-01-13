const {Router} = require('express');
const router = Router();
const UsersMiddleware = require("../../middleware/UsersMiddelware");

// <editor-fold desc="Transactions">

const transactionsController = require('./Transactions/Controller');

router.get('/transactions', UsersMiddleware.check_login_user, transactionsController.index);
router.post('/transactions', UsersMiddleware.check_login_user, transactionsController.store);

// </editor-fold>

// <editor-fold desc="Wallet Transactions">

const walletTransactionsController = require('./WalletTransactions/Controller');

router.get('/wallet-transactions', UsersMiddleware.check_login_user, walletTransactionsController.index);

// </editor-fold>

module.exports = router;
