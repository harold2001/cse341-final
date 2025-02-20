import User from '../models/User.js';

export const isAuthenticated = async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findOne({ oauthId: req.session.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User logged does not exist' });
    }

    req.user = user;

    next();
  } else {
    res.status(401).json({ message: 'You do not have access' });
  }
};
