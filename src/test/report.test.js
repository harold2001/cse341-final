import ReportController from '../controllers/ReportController.js';
import Transaction from '../models/Transaction.js';
import { ALLOWED_TYPES } from '../helpers/constants.js';

jest.mock('../models/Transaction.js');

describe('ReportController', () => {
  let req, res;

  beforeEach(() => {
    req = { user: { _id: 'user123' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getMonthlyReport', () => {
    it('should return a monthly report with transactions', async () => {
      const transactions = [
        {
          category: { name: 'Salary', type: { name: 'income' } },
          amount: 1000,
        },
        {
          category: { name: 'Groceries', type: { name: 'expense' } },
          amount: 200,
        },
      ];

      Transaction.find.mockResolvedValue(transactions);

      await ReportController.getMonthlyReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          totalIncome: 1000,
          totalExpense: 200,
          netBalance: 800,
        })
      );
    });

    it('should handle errors', async () => {
      Transaction.find.mockRejectedValue(new Error('Database error'));

      await ReportController.getMonthlyReport(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error generating monthly report' })
      );
    });
  });

  describe('getYearlyReport', () => {
    it('should return a yearly report', async () => {
      const transactions = [
        { category: { name: 'Salary' }, amount: 12000 },
        { category: { name: 'Rent' }, amount: 6000 },
      ];

      Transaction.find.mockResolvedValue(transactions);

      await ReportController.getYearlyReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          Salary: { amount: 12000 },
          Rent: { amount: 6000 },
        })
      );
    });
  });

  describe('getCategoriesReport', () => {
    it('should return a categories report', async () => {
      const transactions = [
        { category: { name: 'Food' }, amount: 100 },
        { category: { name: 'Food' }, amount: 50 },
      ];

      Transaction.find.mockResolvedValue(transactions);

      await ReportController.getCategoriesReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Food: { name: 'Food', amount: 150 },
      });
    });
  });
});
