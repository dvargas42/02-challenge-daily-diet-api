import { beforeEach, describe, expect, it } from 'vitest'

import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { CreateUserUseCase } from '@/use-cases/create-user-use-case'

import { InMemoryUsersRepository } from '../repository/in-memory-users-repository2'

let usersRepository: IUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user).toEqual(
      expect.objectContaining({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
    expect(user).not.toEqual(
      expect.objectContaining({
        password: expect.any(String),
      }),
    )
  })
})
