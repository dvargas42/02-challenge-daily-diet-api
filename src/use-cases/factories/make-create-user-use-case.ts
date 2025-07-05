import { UsersRepository } from '@/repositories/users-repository'
import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase() {
  const usersRepository = new UsersRepository()
  return new CreateUserUseCase(usersRepository)
}
