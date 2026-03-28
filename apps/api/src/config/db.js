import mongoose from 'mongoose';
import { logger } from '../shared/logger/logger.js';

export async function connectDb() {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`,
    );
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
  }
}
