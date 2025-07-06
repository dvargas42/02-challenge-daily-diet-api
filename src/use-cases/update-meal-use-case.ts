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

  async execute({
    id,
    name,
    description,
    date,
    hour,
    isInDiet,
    userId,
  }: UpdateMealInput): Promise<UpdateMealOutput> {
    const doesTheMealAlreadyExists =
      await this.mealsRepository.findByIdAndUserId(id, userId)

    if (!doesTheMealAlreadyExists) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.save({
      id,
      name,
      description,
      date: new Date(date),
      hour,
      isInDiet,
      userId,
    })

    return {
      meal: {
        id: meal.id,
        name: meal.name,
        description: meal.description,
        date: meal.date.toISOString().slice(0, 10),
        hour: meal.hour.slice(0, 5),
        isInDiet: meal.isInDiet,
      },
    }
  }
}
