import { Router } from 'express';
import usersRoutes from './users.routes.js';
import categoriesRoutes from './categories.routes.js';
import transactionsRoutes from './transactions.routes.js';
import reportsRoutes from './reports.routes.js';
import { isAuthenticated } from '../middlewares/authentication.js';
import passport from 'passport';
import User from '../models/User.js';

const router = Router();

router.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged out'
  );
});

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  async (req, res) => {
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
);

router.get('/login', passport.authenticate('github'), (req, res) => {
  console.log(req);
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.use('/users', isAuthenticated, usersRoutes);
router.use('/categories', isAuthenticated, categoriesRoutes);
router.use('/transactions', isAuthenticated, transactionsRoutes);
router.use('/reports', isAuthenticated, reportsRoutes);

export default router;
