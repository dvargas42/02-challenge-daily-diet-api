import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { User } from 'knex/types/tables'

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create({
    id,
    email,
    name,
    password,
  }: Omit<User, 'created_at' | 'updated_at'>): Promise<User> {
    const user = {
      id,
      name,
      email,
      password,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    }

    this.users.push(user)

    return user
  }
}
