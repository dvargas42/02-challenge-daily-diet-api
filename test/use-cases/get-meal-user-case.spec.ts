import { beforeEach, describe, expect, it } from 'vitest'
import { UUID } from 'node:crypto'

import { GetMealUseCase } from '@/use-cases/get-meal-use-case'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryMealsRepository } from 'test/repository/in-memory-meals-repository'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Get Meal Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(mealsRepository)
  })

  it('should be able to get meal', async () => {
    const mealCreated = await mealsRepository.create({
      name: 'TypeScript salad',
      description: 'Anything description...',
      date: '2025-06-01',
      hour: '00:59',
      is_in_diet: true,
      user_id: 'user-id' as UUID,
    })

    const { meal } = await sut.execute({
      id: mealCreated.id,
      userId: 'user-id' as UUID,
    })

    expect(meal).toEqual(
      expect.objectContaining({
        name: 'TypeScript salad',
        description: 'Anything description...',
        date: '2025-06-01',
        hour: '00:59',
        is_in_diet: true,
        user_id: 'user-id' as UUID,
      }),
    )
  })

  it('should not be able when meal not exists ', async () => {
    await mealsRepository.create({
      name: 'TypeScript salad',
      description: 'Anything description...',
      date: '2025-06-01',
      hour: '00:59',
      is_in_diet: true,
      user_id: 'user-id' as UUID,
    })

    await expect(() =>
      sut.execute({
        id: 'invalid-id' as UUID,
        userId: 'user-id' as UUID,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
