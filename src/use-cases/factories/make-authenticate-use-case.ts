import { UsersRepository } from '@/repositories/users-repository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
