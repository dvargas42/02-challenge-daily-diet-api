import { z } from 'zod'

const getAllMealSchema = z.object({
  page: z.coerce.number(),
  pageSize: z.coerce.number(),
})

export const getAllMealValidation = getAllMealSchema.parse
