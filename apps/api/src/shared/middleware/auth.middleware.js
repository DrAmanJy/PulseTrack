import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import { env } from '../../config/env.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new AppError('Not authorized, no token provided', 401);

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    throw new AppError('Invalid token format', 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(accessToken, env.JWT_ACCESS_PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
  } catch {
    throw new AppError('Invalid or expired access token', 401);
  }

  if (decoded.iss !== env.AUTH_SERVICE_NAME) throw new AppError('Invalid token issuer', 401);
  if (decoded.aud !== env.APP_NAME) throw new AppError('Invalid token audience', 401);

  req.userId = decoded.sub;

  next();
};
