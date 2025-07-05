import { z } from 'zod'

const getMealSchema = z.object({
  id: z.string(),
})

export const getMealValidation = getMealSchema.parse
