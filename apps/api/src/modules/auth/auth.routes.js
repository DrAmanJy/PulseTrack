import { Router } from 'express';
import { validate } from '../../shared/middleware/validate.middleware.js';
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from '@pulsetrack/validations';
import * as authController from './auth.controller.js';
import {
  authLimiter,
  otpLimiter,
} from '../../shared/middleware/rateLimiter.middleware.js';

const routes = Router();

const notImplemented = (req, res) => {
  return res
    .status(501)
    .json({ message: `${req.path} is not implemented yet` });
};

// --- Local Authentication ---
routes.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  authController.registerUser,
);
routes.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  authController.loginUser,
);
routes.post('/logout', authController.logoutUser);

// --- Google OAuth ---
routes.get('/google', authLimiter, notImplemented);
routes.get('/google/callback', authLimiter, notImplemented);

// --- OTP & Password Recovery ---
routes.post(
  '/verify',
  authLimiter,
  validate(verifyOtpSchema),
  authController.verifyUser,
);
routes.post('/resend-otp', otpLimiter, notImplemented);
routes.post('/forgot-password', authLimiter, notImplemented);
routes.post('/reset-password', authLimiter, notImplemented);

// --- Token Management ---
routes.post('/refresh-token', authController.refreshAccessToken);

// --- Protected User Profile Routes (Require Login) ---
routes.get('/me', notImplemented);
routes.patch('/me', notImplemented);
routes.patch('/update-password', notImplemented);
routes.delete('/me', notImplemented);

export default routes;
