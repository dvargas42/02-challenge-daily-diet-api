import type { UUID } from 'node:crypto'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'

type CreateMealInput = {
  name: string
  description: string
  date: Date
  hour: string
  isInDiet: boolean
  userId: UUID
}

type CreateMealsOutput = {
  meal: {
    id: UUID
    name: string
    description: string
    date: string
    hour: string
    isInDiet: boolean
  }
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: IMealsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateMealInput): Promise<CreateMealsOutput> {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.create(data)

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
