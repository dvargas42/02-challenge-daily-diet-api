import { MealsRepository } from '@/repositories/meals-repository'
import { GetMealMetricsUseCase } from '../get-meal-metrics-use-case'

export function makeGetMealMetrics() {
  const mealsRepository = new MealsRepository()
  return new GetMealMetricsUseCase(mealsRepository)
}
