import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller.js';

const router = Router();

router.get('/', TransactionController.getMyTransactions);
router.post('/', TransactionController.createTransaction);
router.get('/:id', TransactionController.getTransactionById);
router.put('/:id', TransactionController.updateTransaction);
router.delete('/:id', TransactionController.deleteTransaction);

export default router;
