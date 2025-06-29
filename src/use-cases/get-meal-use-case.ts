import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'

type GetMealUseCaseRequest = {
  id: string
  userId: string
}

export class GetMealUseCase {
  constructor(public mealsRepository: IMealsRepository) {}

  async execute({ id, userId }: GetMealUseCaseRequest) {
    const meal = await this.mealsRepository.findByIdAndUserId(id, userId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
