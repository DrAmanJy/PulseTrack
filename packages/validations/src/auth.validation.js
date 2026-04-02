import { z } from 'zod';

// ==========================================
// 1. BASE FIELDS
// ==========================================

export const nameField = z
  .string({
    error: (issue) =>
      issue.input === undefined || issue.input === '' ? 'Name required' : 'Must be a string',
  })
  .trim()
  .min(2, { error: 'Min 2 chars' })
  .max(50, { error: 'Max 50 chars' });

export const emailField = z
  .email({
    error: (issue) =>
      issue.input === undefined || issue.input === '' ? 'Email required' : 'Invalid email',
  })
  .trim()
  .toLowerCase();

export const passwordField = z
  .string({
    error: (issue) => (issue.input === '' ? 'Password required' : 'Must be a string'),
  })
  .min(6, { error: 'Min 6 chars' })
  .max(128, { error: 'Max 128 chars' });

export const otpField = z
  .string({
    error: (issue) => (issue === undefined ? 'otp is required' : 'otp must be a string'),
  })
  .length(6, 'otp must be 6 digits')
  .regex(/^\d+$/, 'otp must contain only numbers');

// ==========================================
// 2. AUTHENTICATION SCHEMAS
// ==========================================

export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const verifyOtpSchema = z.object({
  email: emailField,
  otp: otpField,
});

// ==========================================
// 3. UTILITY SCHEMAS
// ==========================================

export const emailOnlySchema = z.object({
  email: emailField,
});

export const newPasswordOnlySchema = z.object({
  newPassword: passwordField,
});

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: passwordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
