import { check, param } from 'express-validator';

export const validateCreateType = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 50 })
    .withMessage('50 characters as maximum'),
];

export const validateUpdateType = [
  param('id').isMongoId().withMessage('Invalid Type ID'),

  check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 50 })
    .withMessage('50 characters as maximum'),
];

export const validateTypeId = [
  param('id').isMongoId().withMessage('Invalid Type ID'),
];
