import { beforeEach, describe, expect, it } from 'vitest'
import { UUID } from 'node:crypto'

import { CreateMealUseCase } from '@/use-cases/create-meal-use-case'
import { CreateUserUseCase } from '@/use-cases/create-user-use-case'
import { GetAllMealsUseCase } from '@/use-cases/get-all-meals-use-case'

import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { InMemoryMealsRepository } from 'test/repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from 'test/repository/in-memory-users-repository2'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let mealsRepository: IMealsRepository
let usersRepository: IUsersRepository

let createUserUseCase: CreateUserUseCase
let createMealUseCase: CreateMealUseCase
let sut: GetAllMealsUseCase

describe('Get All Meals Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    usersRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUserUseCase(usersRepository)
    createMealUseCase = new CreateMealUseCase(mealsRepository, usersRepository)
    sut = new GetAllMealsUseCase(mealsRepository, usersRepository)
  })

  it('should be able to get all meals', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    for (let i = 1; i <= 22; i++) {
      await createMealUseCase.execute({
        name: `TypeScript salad ${i}`,
        description: 'Anything description...',
        date: i < 10 ? `2025-06-0${i}` : `2025-06-${i}`,
        hour: i < 10 ? `0${i}:59` : `${i}:59`,
        isInDiet: true,
        userId: user.id,
      })
    }
    const { meals, total, totalPages } = await sut.execute({
      userId: user.id,
      page: 2,
      pageSize: 20,
    })

    expect(total).toBe(22)
    expect(totalPages).toBe(2)
    expect(Object.keys(meals).length).toEqual(2)
    expect(meals).toEqual(
      expect.objectContaining({
        '21.06.2025': meals['21.06.2025'],
        '22.06.2025': meals['22.06.2025'],
      }),
    )
  })

  it('should not be able to get when userId is invalid', async () => {
    await expect(() =>
      sut.execute({
        userId: 'invalid-user-id' as UUID,
        page: 1,
        pageSize: 20,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
