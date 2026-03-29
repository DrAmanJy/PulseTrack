import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './shared/logger/logger.js';

const PORT = env.APP_PORT;

process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.fatal({ err: error }, 'UNHANDLED REJECTION! Shutting down...');

  process.exit(1);
});

try {
  await connectDb();

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  logger.fatal({ err: error }, 'FAILED TO START SERVER');
  process.exit(1);
}
