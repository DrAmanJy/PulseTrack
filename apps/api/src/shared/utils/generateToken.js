import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

export const generateToken = (payload, type = 'access') => {
  const secret =
    type === 'refresh' ? env.JWT_REFRESH_SECRET : env.JWT_ACCESS_SECRET;

  const expiresIn =
    type === 'refresh' ? env.JWT_REFRESH_EXPIRES_IN : env.JWT_ACCESS_EXPIRES_IN;

  return jwt.sign(payload, secret, { expiresIn });
};
