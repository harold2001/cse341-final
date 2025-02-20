import { Router } from 'express';
import TypeController from '../controllers/type.controller.js';
import { isTypeAllowed } from '../middlewares/type.middleware.js';

const router = Router();

router.get('/', TypeController.getTypes);
router.post('/', TypeController.createType);
router.get('/:id', isTypeAllowed, TypeController.getTypeById);
router.put('/:id', isTypeAllowed, TypeController.updateType);
router.delete('/:id', isTypeAllowed, TypeController.deleteType);

export default router;
