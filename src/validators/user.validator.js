import { check, param } from 'express-validator';

export const validateIdParam = [
  param('id').isMongoId().withMessage('El ID de usuario no es válido'),
];

export const validateUpdateUser = [
  check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no debe estar vacío')
    .isString()
    .withMessage('El nombre debe ser un texto')
    .isLength({ max: 50 })
    .withMessage('Máximo 50 caracteres'),

  check('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El email no debe estar vacío')
    .isEmail()
    .withMessage('Debe ser un email válido'),

  check('password')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La contraseña no debe estar vacía')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];
