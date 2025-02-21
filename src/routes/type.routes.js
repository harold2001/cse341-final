import { Router } from 'express';
import TypeController from '../controllers/type.controller.js';
import { isTypeAllowed } from '../middlewares/type.middleware.js';
import {
  validateCreateType,
  validateTypeId,
  validateUpdateType,
} from '../validators/type.validator.js';
import { handleValidationErrors } from '../middlewares/middleware.js';

const router = Router();

router.get('/', TypeController.getTypes);
router.post(
  '/',
  validateCreateType,
  handleValidationErrors,
  TypeController.createType
);
router.get('/:id', isTypeAllowed, TypeController.getTypeById);
router.put(
  '/:id',
  validateUpdateType,
  handleValidationErrors,
  isTypeAllowed,
  TypeController.updateType
);
router.delete(
  '/:id',
  validateTypeId,
  handleValidationErrors,
  isTypeAllowed,
  TypeController.deleteType
);

export default router;
