import { apiReference } from '@scalar/express-api-reference';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';

import helloWorldRouter from '#routes/hello-world.routes.js';

const app = express();

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Programação 4',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use(
  '/docs',
  apiReference({
    content: openapiSpecification,
    defaultHttpClient: {
      targetKey: 'js',
      clientKey: 'fetch',
    },
  }),
);
app.use(morgan('dev'));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);
app.use('/api', helloWorldRouter);

export default app;
