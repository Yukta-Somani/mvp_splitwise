import express from "express";
const router = express.Router();
import expenseController from '../controllers/expense.controller.js';

router.post('/expenses', expenseController.createExpense);
router.get('/expenses/:id', expenseController.viewExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

export default router;;
