import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Hello World
 *     responses:
 *       200:
 *         description: Returns a JSON response with Hello World.
 */
router.get('/', (_, res) => {
  res.json({ hello: 'world' });
});

export default router;
