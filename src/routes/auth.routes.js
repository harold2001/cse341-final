import { Router } from 'express';
import { handleValidationErrors } from '../middlewares/middleware.js';
import AuthController from '../controllers/auth.controller.js';
import passport from 'passport';

const router = Router();

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  AuthController.gitHubCallbak
);

router.get('/login', passport.authenticate('github'), AuthController.login);

router.get('/logout', AuthController.logout);

router.get('/user', handleValidationErrors, AuthController.getCurrentUser);

export default router;
