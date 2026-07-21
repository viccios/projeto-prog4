import { Router } from 'express';

import * as authController from '#controllers/auth.controller.js';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     tags:
 *       - Auth
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário.
 *     tags:
 *       - Auth
 */
router.post('/login', authController.login);

export default router;