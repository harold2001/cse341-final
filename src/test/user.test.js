import request from 'supertest';
import app from '../app.js'; // Asegúrate de importar la instancia de tu app
import User from '../models/User.js';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';

jest.mock('../models/User.js');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users/me', () => {
    it('should return the current user', async () => {
      const mockUser = {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      };
      User.findById.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer valid_token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 500 if an error occurs', async () => {
      User.findById.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer valid_token');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error retrieving user');
    });
  });

  describe('GET /users/:id', () => {
    it('should return 403 if user ID does not match', async () => {
      const response = await request(app)
        .get('/users/456')
        .set('Authorization', 'Bearer valid_token')
        .send({ user: { id: '123' } });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Unauthorized access');
    });

    it('should return user data if authorized', async () => {
      const mockUser = { _id: '123', name: 'John Doe' };
      User.findById.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/users/123')
        .set('Authorization', 'Bearer valid_token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user currency preference', async () => {
      const mockUpdatedUser = { _id: '123', currencyPreference: 'USD' };
      User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

      const response = await request(app)
        .put('/users/123')
        .send({ currencyPreference: 'USD' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedUser);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete the user and return success message', async () => {
      User.findByIdAndDelete.mockResolvedValue({});

      const response = await request(app).delete('/users/123');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        'User and all related data deleted successfully'
      );
    });
  });
});
