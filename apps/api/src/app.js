import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { env } from './config/env.js';
import { httpLogger } from './shared/logger/httpLogger.js';
import { AppError } from './shared/errors/AppError.js';

import { globalLimiter } from './shared/middleware/rateLimiter.middleware.js';
import { errorHandler } from './shared/middleware/error.middleware.js';
import { authProxy } from './shared/middleware/proxy.middleware.js';

// Routers
import activityRoutes from './modules/activities/activities.routes.js';
import analyticsRoutes from './modules/analytics/analytics.routes.js';

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }),
);
app.disable('x-powered-by');
app.use(httpLogger);

app.use(
  compression({
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    },
  }),
);

app.use('/', authProxy);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. GLOBAL RATE LIMITER
app.use(globalLimiter);

// 6. LOCAL GATEWAY ROUTES
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the PulseTrack API Gateway',
  });
});

app.use(`${env.API_PREFIX}/activity`, activityRoutes);
app.use(`${env.API_PREFIX}/analytics`, analyticsRoutes);

// 7. ERROR HANDLING
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
