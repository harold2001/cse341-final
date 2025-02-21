import { ALLOWED_TYPES } from '../helpers/constants.js';
import Type from '../models/Type.js';

export const isTypeAllowed = async (req, res, next) => {
  const type = await Type.findById(req.params.id);
  const httpMethod = req.method.toLowerCase();
  if (!type) {
    return res.status(404).json({ message: 'Type not found' });
  }

  if (httpMethod !== 'get' && ALLOWED_TYPES.includes(type.name)) {
    return res.status(400).json({ message: 'Type cannot be modified' });
  }

  next();
};
