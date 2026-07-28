import { z } from 'zod';

export const userRegisterSchema = z.object({
  body: z.object({
    user_name: z.string().trim().min(1),
    email: z.email().trim(),
    password: z.string().min(8),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    user_name: z.string().trim().min(1),
    password: z.string().min(8),
  }),
});
