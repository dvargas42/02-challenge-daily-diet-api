import { describe, it, beforeEach, expect } from 'vitest'
import { UUID } from 'node:crypto'

import { UpdateMealUseCase } from '@/use-cases/update-meal-use-case'
import { InMemoryMealsRepository } from 'test/repository/in-memory-meals-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update meal', async () => {
    const mealCreated = await mealsRepository.create({
      name: 'TypeScript salad',
      description: 'Salad caesar...',
      date: '2026-06-01',
      hour: '10:10',
      is_in_diet: true,
      user_id: 'user-id' as UUID,
    })

    const { meal } = await sut.execute({
      id: mealCreated.id,
      name: 'JavaScript hamburguer',
      description: 'Fat food...',
      date: '2026-06-02',
      hour: '10:11',
      isInDiet: false,
      userId: 'user-id' as UUID,
    })

    expect(meal).toEqual(
      expect.objectContaining({
        id: mealCreated.id,
        name: 'JavaScript hamburguer',
        description: 'Fat food...',
        date: '2026-06-02',
        hour: '10:11',
        isInDiet: false,
      }),
    )
  })

  it('should not be able to update meal when not found id or userId', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-id' as UUID,
        name: 'JavaScript hamburguer',
        description: 'Fat food...',
        date: '2026-06-02',
        hour: '10:11',
        isInDiet: false,
        userId: 'invalid-user-id' as UUID,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
