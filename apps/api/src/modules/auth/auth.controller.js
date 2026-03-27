import { renderVerifyOtpEmail } from '@pulsetrack/emails';
import jwt from 'jsonwebtoken';
import { AppError } from '../../shared/errors/AppError.js';
import { generateToken } from '../../shared/utils/generateToken.js';
import { sendEmail } from '../../shared/utils/sendEmail.js';
import User from './auth.model.js';

// ==========================================
//          CONFIGURATION
// ==========================================
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ==========================================
//          CONTROLLERS
// ==========================================

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  const newUser = new User({
    name,
    email,
    password,
    lastLogin: Date.now(),
  });

  const plainTextOtp = await newUser.generateOtp();

  await newUser.save();

  await sendEmail(
    email,
    'Your PulseTrack Verification Code',
    renderVerifyOtpEmail(plainTextOtp),
  );

  res.status(201).json({
    status: 'success',
    message:
      'User registered successfully. Please check your email for the OTP.',
    user: newUser,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select('+password');

  if (!existingUser) {
    throw new AppError('Invalid email or password', 401);
  }

  const isValidPassword = await existingUser.comparePassword(password);
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!existingUser.isVerified) {
    throw new AppError('Account not verified. Please verify your email.', 401);
  }

  const payload = { id: existingUser._id, role: existingUser.role };

  const accessToken = generateToken(payload, 'access');
  const refreshToken = generateToken(payload, 'refresh');

  existingUser.lastLogin = Date.now();
  existingUser.hashAndSetRefreshToken(refreshToken);
  await existingUser.save();

  res.status(200).cookie('refreshToken', refreshToken, cookieOptions).json({
    status: 'success',
    message: 'User logged in successfully.',
    user: existingUser,
    accessToken,
  });
};

export const logoutUser = async (req, res) => {
  const existingUser = await User.findById(req.user.id);

  if (existingUser) {
    existingUser.refreshToken = undefined;
    await existingUser.save();
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

export const verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  const existingUser = await User.findOne({ email }).select(
    '+otp.code +otp.expiresAt',
  );

  if (!existingUser) throw new AppError('User not found with this email.', 404);
  if (existingUser.isVerified)
    throw new AppError('Account is already verified. Please log in.', 400);

  const isValidOtp = await existingUser.verifyOtp(otp);

  if (!isValidOtp)
    throw new AppError('Invalid or expired verification code.', 400);

  existingUser.isVerified = true;
  existingUser.otp = undefined;

  const payload = { id: existingUser._id, role: existingUser.role };
  const accessToken = generateToken(payload, 'access');
  const refreshToken = generateToken(payload, 'refresh');

  existingUser.lastLogin = Date.now();
  existingUser.hashAndSetRefreshToken(refreshToken);

  await existingUser.save();

  res.status(200).cookie('refreshToken', refreshToken, cookieOptions).json({
    status: 'success',
    message: 'User verified and logged in successfully.',
    user: existingUser,
    accessToken,
  });
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken: incomingRefreshToken } = req.cookies;

  if (!incomingRefreshToken) {
    throw new AppError('Unauthorized: No refresh token provided.', 401);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET,
    );
  } catch (error) {
    throw new AppError('Unauthorized: Invalid or expired refresh token.', 401);
  }

  const existingUser = await User.findById(decodedToken.id).select(
    '+refreshToken',
  );

  if (!existingUser) {
    throw new AppError('Unauthorized: User no longer exists.', 401);
  }

  if (!existingUser.verifyRefreshToken(incomingRefreshToken)) {
    throw new AppError('Forbidden: Invalid refresh token session.', 403);
  }

  // 5. Generate BRAND NEW tokens (Token Rotation)
  const payload = { id: existingUser._id, role: existingUser.role };
  const newAccessToken = generateToken(payload, 'access');
  const newRefreshToken = generateToken(payload, 'refresh');

  existingUser.lastLogin = Date.now();
  existingUser.hashAndSetRefreshToken(newRefreshToken);

  await existingUser.save();

  res.status(200).cookie('refreshToken', newRefreshToken, cookieOptions).json({
    status: 'success',
    message: 'Access token refreshed successfully.',
    accessToken: newAccessToken,
  });
};
