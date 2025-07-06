import { MealsRepository } from '@/repositories/meals-repository'
import { UpdateMealUseCase } from '../update-meal-use-case'

export function makeUpdateMealUseCase() {
  const mealsRepository = new MealsRepository()
  return new UpdateMealUseCase(mealsRepository)
}
