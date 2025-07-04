import { z } from 'zod'

const authenticateSchema = z.object({
  email: z.string().email('Email is invalid.'),
  password: z.string(),
})

export const authenticateValidation = authenticateSchema.parse
