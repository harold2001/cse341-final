import request from 'supertest';
import app from '../app.js'; // Asegúrate de que este es el archivo correcto donde está inicializado Express
import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

jest.mock('../models/Transaction.js');
jest.mock('../models/Category.js');

describe('TransactionController', () => {
  const mockUser = { _id: new mongoose.Types.ObjectId() };
  const mockCategory = { _id: new mongoose.Types.ObjectId(), name: 'Food' };
  const mockTransaction = {
    _id: new mongoose.Types.ObjectId(),
    amount: 100,
    category: mockCategory._id,
    description: 'Grocery shopping',
    user: mockUser._id,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get all user transactions', async () => {
    Transaction.find.mockResolvedValue([mockTransaction]);

    const res = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockTransaction]);
  });

  test('should create a transaction', async () => {
    Category.findById.mockResolvedValue(mockCategory);
    Transaction.create.mockResolvedValue(mockTransaction);
    Transaction.findById.mockResolvedValue(mockTransaction);

    const res = await request(app)
      .post('/transactions')
      .send({
        amount: 100,
        category: mockCategory._id,
        description: 'Grocery shopping',
      })
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Transaction created successfully');
    expect(res.body.data).toEqual(mockTransaction);
  });

  test('should return 404 if category not found when creating a transaction', async () => {
    Category.findById.mockResolvedValue(null);

    const res = await request(app)
      .post('/transactions')
      .send({
        amount: 100,
        category: mockCategory._id,
        description: 'Grocery shopping',
      })
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Category not found');
  });

  test('should get a transaction by ID', async () => {
    Transaction.find.mockResolvedValue([mockTransaction]);

    const res = await request(app)
      .get(`/transactions/${mockTransaction._id}`)
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockTransaction]);
  });

  test('should return 404 if transaction not found', async () => {
    Transaction.find.mockResolvedValue([]);

    const res = await request(app)
      .get(`/transactions/${mockTransaction._id}`)
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Transaction not found or is not yours');
  });

  test('should update a transaction', async () => {
    Category.findById.mockResolvedValue(mockCategory);
    Transaction.findByIdAndUpdate.mockResolvedValue(mockTransaction);

    const res = await request(app)
      .put(`/transactions/${mockTransaction._id}`)
      .send({ amount: 200, category: mockCategory._id, description: 'Updated' })
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTransaction);
  });

  test('should delete a transaction', async () => {
    Transaction.findById.mockResolvedValue(mockTransaction);
    Transaction.prototype.deleteOne = jest.fn().mockResolvedValue();

    const res = await request(app)
      .delete(`/transactions/${mockTransaction._id}`)
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Transaction deleted successfully');
  });

  test('should return 404 when deleting a non-existing transaction', async () => {
    Transaction.findById.mockResolvedValue(null);

    const res = await request(app)
      .delete(`/transactions/${mockTransaction._id}`)
      .set('Authorization', `Bearer validToken`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Transaction not found');
  });
});
