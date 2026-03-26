import { z } from 'zod';

export const nameField = z
  .string({
    error: (issue) =>
      issue.input === undefined || issue.input === ''
        ? 'Name required'
        : 'Must be a string',
  })
  .trim()
  .min(2, { error: 'Min 2 chars' })
  .max(50, { error: 'Max 50 chars' });

export const emailField = z
  .email({
    error: (issue) =>
      issue.input === undefined || issue.input === ''
        ? 'Email required'
        : 'Invalid email',
  })
  .trim()
  .toLowerCase();

export const passwordField = z
  .string({
    error: (issue) =>
      issue.input === '' ? 'Password required' : 'Must be a string',
  })
  .min(6, { error: 'Min 6 chars' })
  .max(128, { error: 'Max 128 chars' });
