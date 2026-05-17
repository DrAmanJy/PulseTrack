import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { env } from '../../config/env.js';
import { logger } from '../logger/logger.js';
export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const isProd = env.NODE_ENV === 'production';

  let statusCode = 500;
  // let code = 'not_defined';
  let message = 'Something went wrong on the server';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (error instanceof ZodError) {
    statusCode = 400;
    const firstIssue = error.issues?.[0];
    message =
      (typeof firstIssue?.message === 'string' && firstIssue.message) ||
      'Invalid input data';
  }

  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Your session token is invalid. Please log in again.';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please log in again.';
  }

  logger.error({
    path: req.path,
    method: req.method,
    statusCode,
    err: error,
  });

  const responseBody = {
    status: 'error',
    error: {
      message,
    },
  };

  if (!isProd && error instanceof Error && error.stack) {
    responseBody.error.stack = error.stack;
  }

  res.status(statusCode).json(responseBody);
};
