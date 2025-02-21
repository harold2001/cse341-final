import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { handleValidationErrors } from '../middlewares/middleware.js';
import {
  validateIdParam,
  validateUpdateUser,
} from '../validators/user.validator.js';

const router = Router();

router.get(
  '/:id',
  validateIdParam,
  handleValidationErrors,
  UserController.getUserById
);

router.put(
  '/:id',
  validateIdParam,
  validateUpdateUser,
  handleValidationErrors,
  UserController.updateUser
);

router.delete(
  '/:id',
  validateIdParam,
  handleValidationErrors,
  UserController.deleteUser
);

export default router;
