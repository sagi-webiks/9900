import express, { type Application, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import type { Server } from 'node:http';
import { StatusCodes } from 'http-status-codes';
import rateLimit from 'express-rate-limit';
import { errorHandler, listenersHandler } from '../utils/Handlers';
import TodosRouter from '../api/todos/todos.router';

export default class App {
  private express: Application;
  private port: number | null;
  private static instance: App;

  private constructor() {
    this.port = null;
    this.express = express(); // Create Express application

    this.middlewares(); // Set middlewares
    this.routes(); // Register app routes

    this.express.use(errorHandler); // Add error handling middleware
    listenersHandler(); // Handle database connections
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private routes(): void {
    this.express.get('/', (request: Request, response: Response) => {
      response.status(StatusCodes.OK).send('');  
    });

    this.express.use('/api/todos', TodosRouter);
  }

  private middlewares(): void {
    // Enable Cross-Origin Resource Sharing headers
    this.express.use(
      cors({
        origin: '*', // Allow requests from any origin
        optionsSuccessStatus: 200, // Some legacy browsers choke on 204
      })
    );
  
    // Setting rate limiter, used to limit repeated requests to the API
    this.express.use(
      '/api',
      rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 100, // Limit each IP to 10 requests per `window`
        message: 'Too many requests, please try again later.',
      })
    );
  
    // Setting HTTP headers to protect the app from some well-known web vulnerabilities
    this.express.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            frameAncestors: ["'self'"],
          },
        },
        referrerPolicy: { policy: 'same-origin' },
        hsts: {
          maxAge: 31536000, // 1 year in seconds
          includeSubDomains: true,
          preload: true,
        },
        frameguard: {
          action: 'deny',
        },
        xssFilter: true,
        noSniff: true,
        hidePoweredBy: true,
      })
    );
  
    // Parse requests of content-type application/json
    this.express.use(express.json({ limit: '1mb' }));
  
    // Parse requests of content-type application/x-www-form-urlencoded (url)
    this.express.use(express.urlencoded({ limit: '1mb', extended: true, parameterLimit: 10 }));
  }
  
  public listen(port: number): Server {
    this.port = port;
    return this.express.listen(port, () => {
      console.log(`🚀 Running on port ${port}`);
    });
  }
}
