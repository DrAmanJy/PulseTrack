import { z } from 'zod';
import { emailField, passwordField, nameField } from './fields.js';

export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
});
