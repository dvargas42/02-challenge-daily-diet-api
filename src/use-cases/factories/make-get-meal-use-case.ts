import { MealsRepository } from '@/repositories/meals-repository'
import { GetMealUseCase } from '../get-meal-use-case'

export function makeGetMealUseCase() {
  const mealsRespository = new MealsRepository()
  return new GetMealUseCase(mealsRespository)
}
