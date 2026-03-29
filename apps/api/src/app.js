import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import { env } from './config/env.js';
import { httpLogger } from './shared/logger/httpLogger.js';
import { AppError } from './shared/errors/AppError.js';

import { globalLimiter } from './shared/middleware/rateLimiter.middleware.js';
import { errorHandler } from './shared/middleware/error.middleware.js';

// ==========================================
// 4. ROUTERS
// ==========================================
import authRoutes from './modules/auth/auth.routes.js';
import activityRoutes from './modules/activities/activities.routes.js';

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }),
);
app.disable('x-powered-by');

// Logging
app.use(httpLogger);

app.use(
  compression({
    threshold: 1024, // Only compress responses > 1KB
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(globalLimiter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the PulseTrack API',
  });
});

app.use(`${env.API_PREFIX}/auth`, authRoutes);
app.use(`${env.API_PREFIX}/activity`, activityRoutes);

// Catch-all for unhandled routes (404)
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
