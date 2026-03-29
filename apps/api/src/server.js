import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './shared/logger/logger.js';

const PORT = env.APP_PORT;
let server;

process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'UNCAUGHT EXCEPTION! Shutting down...');

  if (server) {
    server.close(() => {
      logger.info('Server closed. Exiting process.');
      process.exit(1);
    });

    // Force exit after 10 seconds if graceful shutdown fails
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(1);
  }
});

process.on('unhandledRejection', (error) => {
  logger.fatal({ err: error }, 'UNHANDLED REJECTION! Shutting down...');

  if (server) {
    server.close(() => {
      logger.info('Server closed. Exiting process.');
      process.exit(1);
    });

    // Force exit after 10 seconds if graceful shutdown fails
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(1);
  }
});

try {
  await connectDb();

  server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  logger.fatal({ err: error }, 'FAILED TO START SERVER');
  process.exit(1);
}