import { z } from 'zod';

export const activitySchema = z.strictObject({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title too long'),

  category: z.string().trim().toLowerCase().max(50, 'Category too long').optional(),

  duration: z.coerce
    .number({
      required_error: 'Duration is required',
      invalid_type_error: 'Duration must be a number',
    })
    .int('Duration must be a whole number')
    .min(1, 'Must be at least 1 minute')
    .max(1440, 'Cannot exceed 24 hours'),

  date: z.coerce
    .date({
      required_error: 'Date is required',
      invalid_type_error: 'Invalid date format',
    })
    .refine((val) => val <= new Date(), {
      message: 'Cannot log activities in the future',
    }),

  notes: z.string().trim().max(500, 'Notes too long').optional(),
});

export const updateActivitySchema = activitySchema.partial();
