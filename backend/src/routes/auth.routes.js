import { Router } from 'express';

import * as authController from '#controllers/auth.controller.js';
import validate from '#middlewares/validation.middleware.js';
import { userLoginSchema, userRegisterSchema } from '#schemas/user.schema.js';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     tags:
 *       - Auth
 */
router.post('/register', validate(userRegisterSchema), authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário.
 *     tags:
 *       - Auth
 */
router.post('/login', validate(userLoginSchema), authController.login);

export default router;
