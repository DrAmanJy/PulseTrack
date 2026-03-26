import e from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorHandler } from './shared/middleware/error.middleware.js';

const app = e();

app.use(e.json({ limit: '1kb' }));

app.get('/', (req, res) => res.json({ message: 'hello world' }));

app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

export default app;
