import * as z from 'zod';
import { emailField, verificationCode } from './fields.js';
export const verifyOtpSchema = z.object({
  email: emailField,
  otp: verificationCode,
});
