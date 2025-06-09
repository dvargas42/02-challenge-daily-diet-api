import { z } from 'zod'

const mealListSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).default(10),
})

export const mealListAllValidation = mealListSchema.parse
