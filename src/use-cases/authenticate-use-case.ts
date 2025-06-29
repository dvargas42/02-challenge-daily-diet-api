import { compare } from 'bcryptjs'
import { UUID } from 'node:crypto'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'

type AuthenticateInput = {
  email: string
  password: string
}

type AuthenticateUseOutput = {
  user: {
    id: UUID
    name: string
    email: string
  }
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async excute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateUseOutput> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
