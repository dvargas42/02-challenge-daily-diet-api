import { z } from 'zod'

const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long.')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Name must contain only letters and spaces.'),
  email: z.string().email('Email is invalid.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 chraracters long')
    .max(12, 'Password must be at most 12 characteres long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;]/,
      'Password must contain at least one special character',
    ),
})

export const createUserValidation = createUserSchema.parse
