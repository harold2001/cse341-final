import User from '../models/User.js';
import AuthController from '../controllers/auth.controller.js';

jest.mock('../models/User.js');

describe('UserController', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      session: {},
      user: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      redirect: jest.fn(),
    };
    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  describe('logout', () => {
    it('should redirect to home on successful logout', () => {
      mockReq.logout = jest.fn(cb => cb(null));

      AuthController.logout(mockReq, mockRes, mockNext);

      expect(mockReq.logout).toHaveBeenCalled();
      expect(mockRes.redirect).toHaveBeenCalledWith('/');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when logout fails', () => {
      const mockError = new Error('Logout failed');
      mockReq.logout = jest.fn(cb => cb(mockError));

      AuthController.logout(mockReq, mockRes, mockNext);

      expect(mockReq.logout).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockRes.redirect).not.toHaveBeenCalled();
    });
  });

  describe('gitHubCallback', () => {
    it('should create new user and set session when user does not exist', async () => {
      mockReq.user = {
        id: 'github123',
        displayName: 'Test User',
        username: 'testuser',
        provider: 'github',
      };

      User.findOne.mockResolvedValue(null);

      await AuthController.gitHubCallbak(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ oauthId: 'github123' });
      expect(User.create).toHaveBeenCalledWith({
        displayName: 'Test User',
        username: 'testuser',
        provider: 'github',
        oauthId: 'github123',
        currencyPreference: 'USD',
      });
      expect(mockReq.session.user).toEqual(mockReq.user);
      expect(mockRes.redirect).toHaveBeenCalledWith('/');
    });

    it('should set session and redirect when user exists', async () => {
      const mockUser = { oauthId: 'github123' };
      mockReq.user = { id: 'github123' };

      User.findOne.mockResolvedValue(mockUser);

      await AuthController.gitHubCallbak(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ oauthId: 'github123' });
      expect(User.create).not.toHaveBeenCalled();
      expect(mockReq.session.user).toEqual(mockReq.user);
      expect(mockRes.redirect).toHaveBeenCalledWith('/');
    });
  });

  describe('getCurrentUser', () => {
    it('should return 401 if no user in session', async () => {
      mockReq.session = {};

      await AuthController.getCurrentUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Unauthorized access',
      });
    });

    it('should return user if authenticated', async () => {
      const mockUser = { oauthId: '123', username: 'testuser' };
      mockReq.session.user = { id: '123' };
      User.findOne.mockResolvedValue(mockUser);

      await AuthController.getCurrentUser(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ oauthId: '123' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle database errors', async () => {
      mockReq.session.user = { id: '123' };
      const mockError = new Error('DB Error');
      User.findOne.mockRejectedValue(mockError);

      await AuthController.getCurrentUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error retrieving user',
        error: 'DB Error',
      });
    });
  });
});
