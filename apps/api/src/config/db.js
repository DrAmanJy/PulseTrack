import mongoose from 'mongoose';
import { logger } from '../shared/logger/logger.js';
import { env } from './env.js';

export async function connectDb() {
  const conn = await mongoose.connect(`${env.MONGODB_URI}/${env.MONGODB_DB_NAME}`);

  logger.info(`MongoDB Connected: ${conn.connection.host}`);

  mongoose.connection.on('error', (err) => {
    logger.error({ err }, 'MongoDB connection error!');
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Attempting to reconnect...');
  });
}
