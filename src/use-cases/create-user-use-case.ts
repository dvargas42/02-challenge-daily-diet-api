import { UUID } from 'node:crypto'

import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { hash } from 'bcryptjs'

type CreateUserInput = {
  name: string
  email: string
  password: string
}

type CreateUserOutput = {
  user: {
    id: UUID
    name: string
    email: string
  }
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const doesTheEmailAlreadyExist =
      await this.usersRepository.findByEmail(email)

    if (doesTheEmailAlreadyExist) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: await hash(password, 6),
    })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
