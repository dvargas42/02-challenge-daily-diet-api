import { User } from 'knex/types/tables'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Omit<User, 'created_at' | 'updated_at'>): Promise<User>
}
