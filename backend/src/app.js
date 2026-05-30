import express from 'express';
import { apiReference } from '@scalar/express-api-reference';
import swaggerJsdoc from 'swagger-jsdoc';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import helloWorldRouter from '#routes/hello-world.routes.js';

const PORT = process.env.PORT ?? 3000;

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
app.use(helloWorldRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}.`);
  console.log(`Docs running at http://localhost:${PORT}/docs.`);
});
