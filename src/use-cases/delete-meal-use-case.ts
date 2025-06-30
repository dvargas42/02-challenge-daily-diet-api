import { UUID } from 'node:crypto'

import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

type DeleteMealInput = {
  id: UUID
  userId: UUID
}

export class DeleteMealUseCase {
  constructor(public mealsRepository: IMealsRepository) {}

  async execute({ id, userId }: DeleteMealInput): Promise<void> {
    const meal = await this.mealsRepository.findByIdAndUserId(id, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(id, userId)
  }
}
