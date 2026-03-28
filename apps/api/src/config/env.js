import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_NAME: z.string().min(1).default('PulseTrack'),
  APP_PORT: z.coerce.number().positive().default(5000),
  APP_URL: z.url(),
  CLIENT_URL: z.url(),
  API_PREFIX: z
    .string()
    .startsWith('/', 'API_PREFIX must start with /')
    .default('/api/v1'),

  MONGODB_URI: z.url(),
  MONGODB_DB_NAME: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(10, 'Access secret is too short'),
  JWT_ACCESS_EXPIRES_IN: z.string().min(2), // e.g., '15m'
  JWT_REFRESH_SECRET: z.string().min(10, 'Refresh secret is too short'),
  JWT_REFRESH_EXPIRES_IN: z.string().min(2), // e.g., '7d'
  BCRYPT_SALT_ROUNDS: z.coerce.number().min(4).max(20).default(10),

  OTP_LENGTH: z.coerce.number().min(4).max(8).default(6),
  OTP_EXPIRES_MINUTES: z.coerce.number().positive().default(10),
  OTP_MAX_ATTEMPTS: z.coerce.number().positive().default(5),
  OTP_RESEND_COOLDOWN_SECONDS: z.coerce.number().positive().default(60),

  RESEND_API_KEY: z.string().startsWith('re_', 'Invalid Resend API Key format'),

  AVATAR_UPLOAD_DIR: z.string().default('uploads/avatars'),
  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(5),

  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
  LOGIN_MAX_ATTEMPTS: z.coerce.number().positive().max(20).default(5),
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().positive().default(15),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().positive().default(100),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:');

  const errors = _env.error.format();
  for (const [key, value] of Object.entries(errors)) {
    if (value && value._errors) {
      console.error(`- ${key}: ${value._errors.join(', ')}`);
    }
  }

  process.exit(1);
}

export const env = _env.data;
