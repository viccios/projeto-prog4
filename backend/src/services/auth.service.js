import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '#models/user.js';

export async function register(data) {
  const { user_name, email, password } = data;

  if (!user_name || !email || !password) {
    throw {
      status: 400,
      message: 'Todos os campos são obrigatórios.',
    };
  }

  const existingUser = await User.findOne({
    where: {
      user_name,
    },
  });

  if (existingUser) {
    throw {
      status: 409,
      message: 'Nome de usuário já está em uso.',
    };
  }

  const existingEmail = await User.findOne({
    where: {
      email,
    },
  });

  if (existingEmail) {
    throw {
      status: 409,
      message: 'Email já cadastrado.',
    };
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
    throw {
      status: 401,
      message: 'Usuário inválido.',
    };
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password_hash,
  );

  if (!passwordMatch) {
    throw {
      status: 401,
      message: 'Senha inválida.',
    };
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