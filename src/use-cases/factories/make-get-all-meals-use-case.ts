import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { GetAllMealsUseCase } from '../get-all-meals-use-case'

export function makeGetAllMealsUseCase() {
  const usersRepository = new UsersRepository()
  const mealsRepository = new MealsRepository()

  return new GetAllMealsUseCase(mealsRepository, usersRepository)
}
