import { beforeEach, describe, expect, it } from 'vitest'
import { UUID } from 'node:crypto'

import { DeleteMealUseCase } from '@/use-cases/delete-meal-use-case'
import { InMemoryMealsRepository } from 'test/repository/in-memory-meals-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete meal', async () => {
    const meal = await mealsRepository.create({
      name: 'TypeScript Salad',
      description: 'Healthy salad...',
      date: '2026-06-06',
      hour: '10:10',
      isInDiet: true,
      userId: 'user-uuid' as UUID,
    })

    await sut.execute({ id: meal.id, userId: 'user-uuid' as UUID })

    const deletedMeal = await mealsRepository.findByIdAndUserId(
      meal.id,
      'user-uuid' as UUID,
    )

    expect(deletedMeal).toBeNull()
  })

  it('should not be able to delete meal when id or userId not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-meal-id' as UUID,
        userId: 'invalid-user-id' as UUID,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
