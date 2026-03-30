import { compare, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import { generateNumericOTP } from '../../shared/utils/otp.js';
import { hashToken } from '../../shared/utils/hashToken.js';
import { env } from '../../config/env.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === 'local';
      },
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [128, 'Password too long'],
      select: false,
    },
    profileImage: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    isVerified: { type: Boolean, default: false },
    otp: {
      code: { type: String, select: false },
      expiresAt: { type: Date },
    },
    refreshToken: { type: String, select: false },
    resetToken: {
      token: { type: String, select: false },
      expiresAt: { type: Date },
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    lastLogin: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.otp;
        delete ret.refreshToken;
        delete ret.resetToken;
      },
    },
    toObject: { virtuals: true },
  },
);

// ==========================================
//          MIDDLEWARE (HOOKS)
// ==========================================

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  const saltRounds = Number.parseInt(env.BCRYPT_SALT_ROUNDS, 10);
  this.password = await hash(this.password, saltRounds);
});

// ==========================================
//          INSTANCE METHODS
// ==========================================

userSchema.methods.comparePassword = async function (inputPassword) {
  if (!this.password) return false;
  return await compare(inputPassword, this.password);
};

// ------------------------------------------
//          OTP Methods
// ------------------------------------------

userSchema.methods.generateOtp = async function () {
  const verifyCode = generateNumericOTP(6);
  const baseSalt = Number.parseInt(env.BCRYPT_SALT_ROUNDS, 10);
  const otpSaltRounds = Math.max(Math.floor(baseSalt / 2), 4);

  const hashVerifyCode = await hash(verifyCode, otpSaltRounds);
  this.otp = {
    code: hashVerifyCode,
    expiresAt: new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60 * 1000),
  };
  return verifyCode;
};

userSchema.methods.verifyOtp = async function (verifyCode) {
  if (!this.otp || !this.otp.code || this.otp.expiresAt < Date.now()) {
    return false;
  }
  return await compare(verifyCode, this.otp.code);
};

// ------------------------------------------
//          Token Methods
// ------------------------------------------

userSchema.methods.hashAndSetRefreshToken = function (refreshToken) {
  this.refreshToken = hashToken(refreshToken);
};

userSchema.methods.verifyRefreshToken = function (refreshToken) {
  if (!this.refreshToken) return false;
  const hashedInputToken = hashToken(refreshToken);
  return this.refreshToken === hashedInputToken;
};

userSchema.methods.hashAndSetResetToken = function (resetToken) {
  const hashedToken = hashToken(resetToken);

  this.resetToken = {
    token: hashedToken,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };
};

const User = model('User', userSchema);
export default User;
