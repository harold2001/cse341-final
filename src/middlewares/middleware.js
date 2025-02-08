import { CORS_ALLOWED } from '../config/config.js';
import { validationResult } from 'express-validator';

export const validateCORS = (req, res, next) => {
  const { origin } = req.headers;
  if (CORS_ALLOWED.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin ?? '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, accept');
    next();
  } else {
    res.status(403).send('CORS not allowed');
  }
};

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
