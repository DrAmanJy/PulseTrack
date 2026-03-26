import { AppError } from '../../shared/errors/AppError.js';
import { generateToken } from '../../shared/utils/generateToken.js';
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

  const plainTextOtp = await newUser.generateOTP();

  await newUser.save();

  // TODO: implement otp email (using plainTextOtp)
  // await sendEmail({ to: email, ... })

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
