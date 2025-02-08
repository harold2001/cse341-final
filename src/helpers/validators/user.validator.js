import { body, param } from 'express-validator';

export const validateUpdateUser = [
  param('id').isMongoId().withMessage('Invalid user ID format'),

  body('currencyPreference')
    .optional()
    .isIn(['USD', 'EUR', 'PEN'])
    .withMessage('Invalid currency preference'),
];

export const validateIdParam = [
  param('id').isMongoId().withMessage('Invalid user ID format'),
];
