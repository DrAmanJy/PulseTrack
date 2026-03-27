import e from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './shared/middleware/error.middleware.js';
import { AppError } from './shared/errors/AppError.js';
import { globalLimiter } from './shared/middleware/rateLimiter.middleware.js';

const app = e();

app.use(e.json({ limit: '1kb' }));

app.use(globalLimiter);
app.get('/', (req, res) => res.json({ message: 'hello world' }));

app.use('/api/v1/auth', authRoutes);

app.use((req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

app.use(errorHandler);

export default app;
