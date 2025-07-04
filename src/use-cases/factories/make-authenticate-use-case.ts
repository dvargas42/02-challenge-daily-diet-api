import { UsersRepository } from '@/repositories/usersRepository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
