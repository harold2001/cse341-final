import { check } from 'express-validator';

export const validateCreateTransaction = [
  check('amount')
    .exists()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .custom(value => value > 0)
    .withMessage('Amount must be greater than 0'),

  check('category')
    .exists()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid category ID'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description max 255 characters'),
];

export const validateUpdateTransaction = [
  check('amount')
    .optional()
    .isNumeric()
    .withMessage('Amount must be a number')
    .custom(value => value > 0)
    .withMessage('Amount must be greater than 0'),

  check('category').optional().isMongoId().withMessage('Invalid category ID'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description max 255 characters'),
];
