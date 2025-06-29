import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { Meal } from 'knex/types/tables'
import type { UUID } from 'node:crypto'

type CreateMealUseCaseRequest = {
  name: string
  description: string
  date: string
  hour: string
  isInDiet: boolean
  userId: UUID
}

type CreateMealsUseCaseResponse = {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: IMealsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    description,
    date,
    hour,
    isInDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.create({
      name,
      description,
      date,
      hour,
      is_in_diet: isInDiet,
      user_id: user.id,
    })

    return { meal }
  }
}
