import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  statusCode: number;
  stack?: string;

  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;

  const response = {
    success: false,
    message,
    stack,
  };

  res.status(statusCode).json(response);
};

export const listenersHandler = (): void => {
  process.on('SIGINT', async () => {
    try {
      process.exit(0);
    } catch (error) {
      console.error('Error occurred while closing the database connection:', error);
      process.exit(1);
    }
  });

  process.on('SIGTERM', async () => {
    try {
      process.exit(0);
    } catch (error) {
      console.error('Error occurred while closing the database connection:', error);
      process.exit(1);
    }
  });

  process.on('unhandledRejection', async (error: Error) => {
    console.error('Unhandled Promise Rejection:\n', error);
    try {
      process.exit(1);
    } catch (error) {
      console.error('Error occurred while closing the database connection:', error);
      process.exit(1);
    }
  });

  process.on('uncaughtException', async (error: Error) => {
    console.error('Uncaught exception occurred:\n', error);
    try {
      process.exit(1);
    } catch (error) {
      console.error('Error occurred while closing the database connection:', error);
      process.exit(1);
    }
  });
};
