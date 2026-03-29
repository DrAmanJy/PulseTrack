import { isValidObjectId } from 'mongoose';
import { AppError } from '../errors/AppError.js';

export const validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    req[source] = schema.parse(req[source]);
    next();
  };

export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new AppError('Invalid ID format', 400);
  next();
};
