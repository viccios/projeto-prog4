import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '#models/user.js';
import {
  ConflictError,
  UnauthorizedError,
  ValidationError,
} from '#utils/app-errors.util.js';

export async function register(data) {
  const { user_name, email, password } = data;

  if (!user_name || !email || !password) {
    throw new ValidationError('Todos os campos são obrigatórios', [
      "'user_name' é obrigatório",
      "'email' é obrigatório",
      "'password' é obrigatório",
    ]);
  }

  const existingUser = await User.findOne({
    where: {
      user_name,
    },
  });

  if (existingUser) {
    throw new ConflictError('Nome de usuário já está em uso.');
  }

  const existingEmail = await User.findOne({
    where: {
      email,
    },
  });

  if (existingEmail) {
    throw new ConflictError('Email já cadastrado.');
  }

  const password_hash = await bcrypt.hash(password, 12);

  const user = await User.create({
    user_name,
    email,
    password_hash,
  });

  return {
    message: 'Usuário criado com sucesso.',
    user: {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
    },
  };
}

export async function login(data) {
  const { user_name, password } = data;

  const user = await User.findOne({
    where: {
      user_name,
    },
  });

  if (!user) {
    throw new UnauthorizedError('Usuário inválido.');
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new UnauthorizedError('Senha inválida.');
  }

  const token = jwt.sign(
    {
      id: user.id,
      user_name: user.user_name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );

  return {
    token,
    user: {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
    },
  };
}
