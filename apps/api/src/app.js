import e from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './shared/middleware/error.middleware.js';
import { AppError } from './shared/errors/AppError.js';
import { globalLimiter } from './shared/middleware/rateLimiter.middleware.js';
import { env } from './config/env.js';
import { httpLogger } from './shared/logger/httpLogger.js';
import helmet from 'helmet';

const app = e();
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }),
);
app.disable('x-powered-by');
app.use(httpLogger);
app.use(e.json({ limit: '1kb' }));

app.use(globalLimiter);
app.get('/', (req, res) => res.json({ message: 'hello world' }));

app.use(`'${env.API_PREFIX}/auth`, authRoutes);

app.use((req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

app.use(errorHandler);

export default app;
