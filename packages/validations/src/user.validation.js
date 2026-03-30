import { z } from 'zod';
import { emailField, nameField, passwordField } from './auth.validation.js';

export const avatarSchema = z.object({
  mimetype: z.enum(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']),
  size: z.number().max(5_000_000, 'File must be less than 5MB'),
});

export const updateUserSchema = z.strictObject({
  name: nameField.optional(),
});

export const updatePasswordSchema = z
  .strictObject({
    currentPassword: passwordField,
    newPassword: passwordField,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    error: 'New password must be different from current password',
    path: ['newPassword'],
  });

export const updateEmailSchema = z
  .strictObject({ currentEmail: emailField, newEmail: emailField })
  .refine((data) => data.currentEmail !== data.newEmail, {
    error: 'New email must be different from current email',
    path: ['newEmail'],
  });
