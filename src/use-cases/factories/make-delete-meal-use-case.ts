import { MealsRepository } from '@/repositories/meals-repository'
import { DeleteMealUseCase } from '../delete-meal-use-case'

export function makeDeleteMealUseCase() {
  const mealsRepository = new MealsRepository()
  return new DeleteMealUseCase(mealsRepository)
}
