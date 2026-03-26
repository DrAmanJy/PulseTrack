import { AppError } from '../errors/AppError.js';
export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const isProd = process.env.NODE_ENV === 'production';

  let statusCode = 500;
  let message = 'Something went wrong on the server';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Your session token is invalid. Please log in again.';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please log in again.';
  }

  if (!isProd) {
    console.error('ErrorHandler:', {
      path: req.path,
      method: req.method,
      statusCode,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  const responseBody = {
    success: false,
    error: {
      message,
    },
  };

  if (!isProd && error instanceof Error && error.stack) {
    responseBody.error.stack = error.stack;
  }

  res.status(statusCode).json(responseBody);
};
