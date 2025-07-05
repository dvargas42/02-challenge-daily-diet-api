import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { CreateMealUseCase } from '../create-meal-use-case'

export function makeCreateMealUseCase() {
  const usersRepository = new UsersRepository()
  const mealsRepository = new MealsRepository()

  return new CreateMealUseCase(mealsRepository, usersRepository)
}
