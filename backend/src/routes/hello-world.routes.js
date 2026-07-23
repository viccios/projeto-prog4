import { Router } from 'express';

import auth from '#middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * /api/hello:
 *   get:
 *     description: Hello World
 *     responses:
 *       200:
 *         description: Returns a JSON response with Hello World.
 */
router.get('/hello', auth, (_, res) => {
  res.json({ hello: 'world' });
});

export default router;
