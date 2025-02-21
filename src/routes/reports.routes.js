import { Router } from 'express';
import reportController from '../controllers/report.controller.js';

const router = Router();

router.get('/monthly', reportController.getMonthlyReport);
router.get('/yearly', reportController.getYearlyReport);
router.get('/categories', reportController.getCategoriesReport);

export default router;
