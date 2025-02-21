import { check } from 'express-validator';

export const validateCreateCategory = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 50 })
    .withMessage('50 characters as maximum'),

  check('type')
    .notEmpty()
    .withMessage('Type is required')
    .isMongoId()
    .withMessage('Invalid ID'),
];

export const validateUpdateCategory = [
  check('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .isString()
    .withMessage('Name must be a text')
    .isLength({ max: 50 })
    .withMessage('50 characters as maximum'),
];
