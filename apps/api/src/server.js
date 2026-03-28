import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './shared/logger/logger.js';

const PORT = env.APP_PORT;

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(
      'Critical: Server failed to start due to DB connection error.',
    );
    process.exit(1);
  }
})();
