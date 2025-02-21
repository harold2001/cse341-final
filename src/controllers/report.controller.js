import Transaction from '../models/Transaction.js';
import { ALLOWED_TYPES } from '../helpers/constants.js';

class ReportController {
  async getMonthlyReport(req, res) {
    /* #swagger.tags = ['Reports'] */
    try {
      const userId = req.user._id;
      const now = new Date();

      const startDate = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
      );
      const endDate = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
      );

      const transactions = await Transaction.find({
        user: userId,
        date: { $gte: startDate, $lt: endDate },
      }).populate({
        path: 'category',
        populate: {
          path: 'type',
        },
      });

      const report = {
        income: {},
        expense: {},
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
        currency: 'USD',
      };

      transactions.forEach(transaction => {
        const category = transaction.category;
        if (!category || !ALLOWED_TYPES.includes(category.type.name)) {
          return;
        }

        const type = category.type.name;
        const categoryName = category.name;

        if (!report[type][categoryName]) {
          report[type][categoryName] = {
            amount: 0,
            transactionCount: 0,
          };
        }

        report[type][categoryName].amount += transaction.amount;
        report[type][categoryName].transactionCount++;

        type === 'income'
          ? (report.totalIncome += transaction.amount)
          : (report.totalExpense += transaction.amount);
      });

      report.netBalance = report.totalIncome - report.totalExpense;

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({
        message: 'Error generating monthly report',
        error: error.message,
      });
    }
  }

  async getYearlyReport(req, res) {
    /* #swagger.tags = ['Reports'] */
    try {
      const userId = req.user._id;
      const now = new Date();
      const lastYear = new Date(now);
      lastYear.setFullYear(now.getFullYear() - 1);

      const transactions = await Transaction.find({
        user: userId,
        date: { $gte: lastYear, $lt: now },
      }).populate({
        path: 'category',
        populate: { path: 'type' },
      });

      const report = transactions.reduce((acc, transaction) => {
        const { category } = transaction;
        if (!category) return acc;
        if (!acc[category.name]) {
          acc[category.name] = {
            name: category.name,
            amount: 0,
          };
        }
        acc[category.name].amount += transaction.amount;
        return acc;
      }, {});

      report.year = now.getFullYear();

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving yearly report',
        error: error.message,
      });
    }
  }

  async getCategoriesReport(req, res) {
    /* #swagger.tags = ['Reports'] */
    try {
      const transactions = await Transaction.find({
        user: req.user._id,
      }).populate('category');

      const report = transactions.reduce((acc, transaction) => {
        const { category } = transaction;
        if (!category) return acc;
        if (!acc[category.name]) {
          acc[category.name] = {
            name: category.name,
            amount: 0,
          };
        }
        acc[category.name].amount += transaction.amount;
        return acc;
      }, {});

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving categories report',
        error: error.message,
      });
    }
  }
}

export default new ReportController();
