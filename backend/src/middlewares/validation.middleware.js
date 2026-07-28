import { ValidationError } from '#utils/app-errors.util.js';

/**
 * Express middleware to validate request bodies and params using Zod.
 *
 * @template {import('zod').ZodType} T
 * @param {T} schema - The Zod schema to validate against.
 * @returns {import('express').RequestHandler} An Express middleware function.
 */
export default function validate(schema) {
  return function (req, _, next) {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      throw new ValidationError('Validation failed', result.error.issues);
    }

    next();
  };
}
