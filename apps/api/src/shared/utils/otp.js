import crypto from 'crypto';
import { env } from '../../config/env.js';

export const generateNumericOTP = (length = env.OTP_LENGTH) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return crypto.randomInt(min, max + 1).toString();
};
