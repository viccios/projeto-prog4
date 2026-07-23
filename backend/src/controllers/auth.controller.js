import * as authService from '#services/auth.service.js';
import { HttpStatus } from '#utils/http-status.util.js';

export async function register(req, res) {
  const response = await authService.register(req.body);

  res.status(HttpStatus.CREATED).json(response);
}

export async function login(req, res) {
  const response = await authService.login(req.body);

  res.json(response);
}
