import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import User from '../../modules/auth/auth.model.js';
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
    decoded = jwt.verify(accessToken, env.JWT_ACCESS_SECRET, {
      algorithms: ['HS256'],
    });
  } catch {
    throw new AppError('Invalid or expired access token', 401);
  }

  // Validate decoded payload shape
  if (!decoded || typeof decoded !== 'object' || !decoded.id) {
    throw new AppError('Invalid or expired access token', 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) throw new AppError('The user belonging to this token no longer exists', 401);

  if (!user.isVerified) throw new AppError('This user account is unverified', 403);

  req.user = user;

  next();
};
