import rateLimit from 'express-rate-limit';
import { env } from '../../config/env';

const responseHandler = (req, res, next, options) => {
  const resetTime = req.rateLimit.resetTime;

  const retryAfterMinutes = Math.ceil((resetTime - Date.now()) / 60000);

  res.status(options.statusCode || 429).json({
    status: 'fail',
    error: {
      message: options.message,
      retryAfter: `${retryAfterMinutes} minutes`,
      retryAt: new Date(resetTime).toISOString(),
    },
  });
};

export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
  handler: responseHandler,
});

export const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.LOGIN_MAX_ATTEMPTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts, please try again after 15 minutes.',
  handler: responseHandler,
});

export const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.OTP_MAX_ATTEMPTS,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    'Too many OTP requests. Please wait an hour before requesting another.',
  handler: responseHandler,
});
