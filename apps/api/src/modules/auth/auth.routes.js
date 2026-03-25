import { Router } from 'express';

const routes = Router();

const notImplemented = (req, res) => {
  return res
    .status(501)
    .json({ message: `${req.path} is not implemented yet` });
};

// --- Local Authentication ---
routes.post('/register', notImplemented);
routes.post('/login', notImplemented);
routes.post('/logout', notImplemented);

// --- Google OAuth ---
routes.get('/google', notImplemented);
routes.get('/google/callback', notImplemented);

// --- OTP & Password Recovery ---
routes.post('/verify-otp', notImplemented);
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
