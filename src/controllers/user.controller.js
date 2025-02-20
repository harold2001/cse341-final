import User from '../models/User.js';

class UserController {
  async getCurrentUser(req, res) {
    /* #swagger.tags = ['Users'] */
    try {
      const user = await User.findById(req.user?.id).select('-refreshToken');
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving user', error: error.message });
    }
  }

  async getUserById(req, res) {
    /* #swagger.tags = ['Users'] */
    try {
      if (req.params?.id !== req.user?.id) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      const user = await User.findById(req.params.id).select('-refreshToken');
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving user', error: error.message });
    }
  }

  async updateUser(req, res) {
    /* #swagger.tags = ['Users'] */
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { currencyPreference: req.body.currencyPreference },
        { new: true, runValidators: true }
      ).select('-refreshToken');

      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error updating user', error: error.message });
    }
  }

  async deleteUser(req, res) {
    /* #swagger.tags = ['Users'] */
    try {
      await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: 'User and all related data deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error deleting user', error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    /* #swagger.tags = ['Users'] */
    try {
      const user = await User.findById(req.user?.id).select('-refreshToken');
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving user', error: error.message });
    }
  }
}

export default new UserController();
