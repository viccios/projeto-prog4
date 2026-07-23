import {
  ConflictError,
  UnauthorizedError,
  ValidationError,
} from '#utils/app-errors.util.js';
import { HttpStatus } from '#utils/http-status.util.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, _next) {
  const statusCode = err.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message ?? 'Internal Server Error';

  console.error('ERROR:', {
    name: err.name,
    message,
    status: statusCode,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof ValidationError) {
    return res.status(statusCode).json({
      status: 'error',
      type: 'validation',
      message,
      details: err.details,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(statusCode).json({
      status: 'error',
      type: 'conflict',
      message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(statusCode).json({
      status: 'error',
      type: 'unauthorized',
      message,
    });
  }

  res.status(statusCode).json({
    status: 'error',
    message,
  });
}
