import { HttpStatus } from './http-status.util.js';

export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class ValidationError extends AppError {
  constructor(message, details) {
    super(message, HttpStatus.BAD_REQUEST);
    this.details = details;
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
