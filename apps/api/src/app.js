import e from 'express';
import authRoutes from './modules/auth/auth.routes.js';

const app = e();

app.use(e.json({ limit: '1kb' }));

app.get('/', (req, res) => res.json({ message: 'hello world' }));

app.use('/api/v1/auth', authRoutes);

export default app;
