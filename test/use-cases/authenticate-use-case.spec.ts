import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { CreateUserUseCase } from '@/use-cases/create-user-use-case'
import { InMemoryUsersRepository } from 'test/repository/in-memory-users-repository2'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: IUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { user } = await sut.excute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should be not able to authenticate with wrong email', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(() =>
      sut.excute({
        email: 'wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to authenticate with wrong password', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(() =>
      sut.excute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to authenticate when user not exists', async () => {
    expect(() =>
      sut.excute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
