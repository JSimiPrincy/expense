const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middlewares/auth');
const { validateExpense, validate } = require('../middlewares/validation');

router.post('/', auth, validateExpense, validate, expenseController.addExpense);
router.get('/user', auth, expenseController.getUserExpenses);
router.get('/all', auth, expenseController.getAllExpenses);
router.get('/balance-sheet', auth, expenseController.downloadBalanceSheet);

module.exports = router;

