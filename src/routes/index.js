import { Router } from 'express';
import usersRoutes from './users.routes.js';
import categoriesRoutes from './categories.routes.js';
import transactionsRoutes from './transactions.routes.js';
import reportsRoutes from './reports.routes.js';
import swaggerRoutes from './swagger.routes.js';
import authRoutes from './auth.routes.js';
import typeRoutes from './type.routes.js';
import { isAuthenticated } from '../middlewares/authentication.js';

const router = Router();

router.get('/', (req, res) => {
  /* #swagger.tags = ['Root'] */
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged out'
  );
});

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, usersRoutes);
router.use('/categories', isAuthenticated, categoriesRoutes);
router.use('/types', isAuthenticated, typeRoutes);
router.use('/transactions', isAuthenticated, transactionsRoutes);
router.use('/reports', isAuthenticated, reportsRoutes);
router.use('/api-docs', swaggerRoutes);

export default router;
