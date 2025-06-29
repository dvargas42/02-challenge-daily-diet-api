import { UUID } from 'node:crypto'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'

type GetMealInput = {
  id: string
  userId: string
}

type GetMealOutput = {
  meal: {
    id: UUID
    name: string
    description: string
    date: string
    hour: string
    isInDiet: boolean
  }
}

export class GetMealUseCase {
  constructor(public mealsRepository: IMealsRepository) {}

  async execute({ id, userId }: GetMealInput): Promise<GetMealOutput> {
    const meal = await this.mealsRepository.findByIdAndUserId(id, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
