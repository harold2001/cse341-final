import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller.js';
import {
  validateCreateTransaction,
  validateUpdateTransaction,
} from '../validators/transaction.validator.js';

const router = Router();

router.get('/', TransactionController.getMyTransactions);
router.post(
  '/',
  validateCreateTransaction,
  TransactionController.createTransaction
);
router.get('/:id', TransactionController.getTransactionById);
router.put(
  '/:id',
  validateUpdateTransaction,
  TransactionController.updateTransaction
);
router.delete('/:id', TransactionController.deleteTransaction);

export default router;
