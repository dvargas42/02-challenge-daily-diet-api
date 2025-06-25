import { randomUUID } from 'node:crypto'

import { User } from 'knex/types/tables'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { hash } from 'bcryptjs'

type CreateUserUseCaseRequest = {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = {
  user: Omit<User, 'created_at' | 'updated_at'>
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.create({
      id: randomUUID(),
      name,
      email,
      password: await hash(password, 6),
    })

    return { user }
  }
}
