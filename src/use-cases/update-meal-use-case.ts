import { UUID } from 'node:crypto'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'

type UpdateMealInput = {
  id: UUID
  name: string
  description: string
  date: string
  hour: string
  isInDiet: boolean
  userId: UUID
}

type UpdateMealOutput = {
  meal: {
    id: UUID
    name: string
    description: string
    date: string
    hour: string
    isInDiet: boolean
  }
}
export class UpdateMealUseCase {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute(data: UpdateMealInput): Promise<UpdateMealOutput> {
    const doesTheMealAlreadyExists =
      await this.mealsRepository.findByIdAndUserId(data.id, data.userId)

    if (!doesTheMealAlreadyExists) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.save(data)

    return {
      meal: {
        id: meal.id,
        name: meal.name,
        description: meal.description,
        date: meal.date,
        hour: meal.hour,
        isInDiet: meal.isInDiet,
      },
    }
  }
}
