import { beforeEach, describe, expect, it } from 'vitest'

import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { CreateMealUseCase } from '@/use-cases/create-meal-use-case'
import { CreateUserUseCase } from '@/use-cases/create-user-use-case'

import { InMemoryMealsRepository } from 'test/repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from 'test/repository/in-memory-users-repository2'
import { UUID } from 'crypto'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let mealsRepository: IMealsRepository
let usersRepository: IUsersRepository

let createUserUseCase: CreateUserUseCase
let sut: CreateMealUseCase

describe('Create Meals Use Case', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    usersRepository = new InMemoryUsersRepository()

    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new CreateMealUseCase(mealsRepository, usersRepository)
  })

  it('should be able to create meals', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const mealIn = {
      name: 'Caeser Salad',
      description: 'Salad with fresh vegetables...',
      date: '15/06/2025',
      hour: '10:10',
      isInDiet: true,
      userId: user.id,
    }

    const { meal } = await sut.execute(mealIn)

    expect(meal).toEqual(
      expect.objectContaining({
        name: 'Caeser Salad',
        description: 'Salad with fresh vegetables...',
        date: '15/06/2025',
        hour: '10:10',
      }),
    )
  })

  it('should not be able to create meals with wrong userId', async () => {
    await expect(() =>
      sut.execute({
        name: 'Caeser Salad',
        description: 'Salad with fresh vegetables...',
        date: '15/06/2025',
        hour: '10:10',
        isInDiet: true,
        userId: '5dff9623-dd59-47a2-b988-ed5b0af5c86b' as UUID,
      }),
    ).rejects.instanceOf(ResourceNotFoundError)
  })
})
