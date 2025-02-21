import CategoryController from '../controllers/CategoryController.js';
import Category from '../models/Category.js';
import { jest } from '@jest/globals';

describe('CategoryController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCategories should return categories', async () => {
    const mockCategories = [{ _id: '1', name: 'Category1', type: 'Type1' }];
    Category.find = jest
      .fn()
      .mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCategories),
      });

    await CategoryController.getCategories(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  test('createCategory should create a new category', async () => {
    req.body = { name: 'New Category', type: 'Type1' };
    const mockCategory = { _id: '2', ...req.body };
    Category.create = jest.fn().mockResolvedValue(mockCategory);

    await CategoryController.createCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test('getCategoryById should return a category', async () => {
    req.params.id = '1';
    const mockCategory = { _id: '1', name: 'Category1', type: 'Type1' };
    Category.findById = jest
      .fn()
      .mockReturnValue({ populate: jest.fn().mockResolvedValue(mockCategory) });

    await CategoryController.getCategoryById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test('updateCategory should update and return category', async () => {
    req.params.id = '1';
    req.body = { name: 'Updated Category' };
    const mockCategory = { _id: '1', name: 'Updated Category', type: 'Type1' };
    Category.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ populate: jest.fn().mockResolvedValue(mockCategory) });

    await CategoryController.updateCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test('deleteCategory should delete a category', async () => {
    req.params.id = '1';
    Category.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await CategoryController.deleteCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category deleted successfully',
    });
  });
});
