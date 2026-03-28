import { z } from 'zod';

export const activitySchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title too long'),

  category: z
    .string()
    .trim()
    .toLowerCase()
    .max(50, 'Category too long')
    .optional(),

  duration: z.coerce
    .number({
      error: (issue) =>
        issue === undefined
          ? 'Duration is required'
          : 'Duration must be a number',
    })
    .int('Duration must be a whole number')
    .min(1, 'Must be at least 1 minute')
    .max(1440, 'Cannot exceed 24 hours'),

  date: z.coerce
    .date({ required_error: 'Date is required' })
    .max(new Date(), 'Cannot log activities in the future'),

  notes: z.string().trim().max(500, 'Notes too long').optional(),
});
