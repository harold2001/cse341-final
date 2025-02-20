import User from '../models/User.js';

class UserController {
  async login(req, res) {
    /* #swagger.tags = ['Auth'] */
    console.log(req);
  }

  async logout(req, res, next) {
    /* #swagger.tags = ['Auth'] */
    req.logout(err => {
      if (err) return next(err);
      res.redirect('/');
    });
  }

  async gitHubCallbak(req, res) {
    /* #swagger.tags = ['Auth'] */
    const user = await User.findOne({ oauthId: req.user.id });
    if (!user) {
      await User.create({
        displayName: req.user.displayName,
        username: req.user.username,
        provider: req.user.provider,
        oauthId: req.user.id,
        currencyPreference: 'USD',
      });
    }

    req.session.user = req.user;
    res.redirect('/');
  }

  async getCurrentUser(req, res) {
    /* #swagger.tags = ['Auth'] */
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }

      const user = await User.findOne({ oauthId: req.session.user.id });
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving user', error: error.message });
    }
  }
}

export default new UserController();
