import { Router } from 'express';
import { validate } from '../../shared/middleware/validate.middleware.js';
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from '@pulsetrack/validations';
import * as authController from './auth.controller.js';

const routes = Router();

const notImplemented = (req, res) => {
  return res
    .status(501)
    .json({ message: `${req.path} is not implemented yet` });
};

// --- Local Authentication ---
routes.post('/register', validate(registerSchema), authController.registerUser);
routes.post('/login', validate(loginSchema), authController.loginUser);
routes.post('/logout', authController.logoutUser);

// --- Google OAuth ---
routes.get('/google', notImplemented);
routes.get('/google/callback', notImplemented);

// --- OTP & Password Recovery ---
routes.post('/verify', validate(verifyOtpSchema), authController.verifyUser);
routes.post('/resend-otp', notImplemented);
routes.post('/forgot-password', notImplemented);
routes.post('/reset-password', notImplemented);

// --- Token Management ---
routes.post('/refresh-token', notImplemented);

// --- Protected User Profile Routes (Require Login) ---
routes.get('/me', notImplemented);
routes.patch('/me', notImplemented);
routes.patch('/update-password', notImplemented);
routes.delete('/me', notImplemented);

export default routes;
