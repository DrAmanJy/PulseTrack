import { z } from 'zod';
import { emailField, passwordField } from './fields.js';

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});
