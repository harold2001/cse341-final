import { Router } from 'express';
import CategoryController from '../controllers/category.controller.js';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../validators/category.validator.js';
import { handleValidationErrors } from '../middlewares/middleware.js';

const router = Router();

router.get('/', CategoryController.getCategories);
router.post(
  '/',
  validateCreateCategory,
  handleValidationErrors,
  CategoryController.createCategory
);
router.get('/:id', CategoryController.getCategoryById);
router.put(
  '/:id',
  validateUpdateCategory,
  handleValidationErrors,
  CategoryController.updateCategory
);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
