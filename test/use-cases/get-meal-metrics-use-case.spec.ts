import { GetMealMetricsUseCase } from '@/use-cases/get-meal-metrics-use-case'
import { UUID } from 'node:crypto'
import { InMemoryMealsRepository } from 'test/repository/in-memory-meals-repository'
import { beforeEach, describe, expect, it } from 'vitest'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealMetricsUseCase

describe('Get Meal Metrics Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealMetricsUseCase(mealsRepository)
  })

  it('should be able to get metrics of meals', async () => {
    const isInDiet = [
      false,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
    ]

    for (let i = 1; i <= isInDiet.length; i++) {
      mealsRepository.create({
        name: `TypeScript food ${i}`,
        description: 'Anything description...',
        date: i < 10 ? `2026-06-0${i}` : `2026-06-${i}`,
        hour: i < 10 ? `0${i}:59` : `${i}:59`,
        isInDiet: isInDiet[i - 1],
        userId: 'user-id' as UUID,
      })
    }

    const { metrics } = await sut.execute({ userId: 'user-id' as UUID })

    expect(metrics).toEqual({
      betterSequenceOfMeals: 5,
      totalOfMealsAreInDiet: 8,
      totalOfMealsAreNotInDiet: 4,
      totalOfMeals: 12,
    })
  })

  it('should be able to get metrics when all values were zero', async () => {
    const { metrics } = await sut.execute({ userId: 'user-id' as UUID })

    expect(metrics).toEqual({
      betterSequenceOfMeals: 0,
      totalOfMealsAreInDiet: 0,
      totalOfMealsAreNotInDiet: 0,
      totalOfMeals: 0,
    })
  })
})
