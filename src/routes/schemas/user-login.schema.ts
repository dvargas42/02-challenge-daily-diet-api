import { z } from 'zod'

const userLoginSchema = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string(),
})

export const userLoginValidation = userLoginSchema.parse
