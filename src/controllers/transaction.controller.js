import Category from '../models/Category.js';
import Transaction from '../models/Transaction.js';

class TransactionController {
  async getMyTransactions(req, res) {
    /* #swagger.tags = ['Transactions'] */
    try {
      const transactions = await Transaction.find({
        user: req.user._id,
      }).populate('category');
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving your transactions',
        error: error.message,
      });
    }
  }

  async createTransaction(req, res) {
    /* #swagger.tags = ['Transactions'] */
    try {
      const category = await Category.findById(req.body.category);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const transaction = await Transaction.create({
        amount: req.body.amount,
        category: category._id,
        description: req.body.description,
        user: req.user._id,
      });

      const populatedTransaction = await Transaction.findById(
        transaction._id
      ).populate('category');

      res.status(201).json({
        message: 'Transaction created successfully',
        data: populatedTransaction,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating transaction',
        error: error.message,
      });
    }
  }

  async getTransactionById(req, res) {
    /* #swagger.tags = ['Transactions'] */
    try {
      const transaction = await Transaction.find({
        _id: req.params.id,
        user: req.user._id,
      }).populate('category');

      if (!transaction) {
        return res
          .status(404)
          .json({ message: 'Transaction not found or is not yours' });
      }

      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving transaction',
        error: error.message,
      });
    }
  }

  async updateTransaction(req, res) {
    /* #swagger.tags = ['Transactions'] */
    try {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        {
          amount: req.body.amount,
          category: category._id,
          description: req.body.description,
        },
        { new: true, runValidators: true }
      ).populate('category');

      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({
        message: 'Error updating transaction',
        error: error.message,
      });
    }
  }

  async deleteTransaction(req, res) {
    /* #swagger.tags = ['Transactions'] */
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      await transaction.deleteOne();

      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting transaction',
        error: error.message,
      });
    }
  }
}

export default new TransactionController();
