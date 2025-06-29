import { UserEntity } from '@/entities/user-entity'
import {
  CreateParams,
  IUsersRepository,
} from '@/repositories/contracts/i-users-repository'
import { randomUUID, UUID } from 'crypto'
import { User } from 'knex/types/tables'

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = []

  async findById(id: UUID): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create({ email, name, password }: CreateParams): Promise<UserEntity> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    }

    this.users.push(user)

    return UserEntity.fromDatabase(user)
  }
}
