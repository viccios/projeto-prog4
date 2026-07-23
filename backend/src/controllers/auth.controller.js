import * as authService from '#services/auth.service.js';

export async function register(req, res) {
  try {
    const response = await authService.register(req.body);

    res.status(201).json(response);
  } catch (error) {
    console.error(error);

    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const response = await authService.login(req.body);

    res.json(response);
  } catch (error) {
    console.error(error);

    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }
}