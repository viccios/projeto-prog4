import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '#utils/app-errors.util.js';

export default function auth(req, _res, next) {
  const authHeader = req.headers.authorization || '';

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('Missing or invalid Authorization header');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      user_name: decoded.user_name,
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Access token expired');
    }

    throw new UnauthorizedError('Invalid token');
  }
}
