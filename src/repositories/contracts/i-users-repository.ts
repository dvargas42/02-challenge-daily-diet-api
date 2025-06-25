import { User } from 'knex/types/tables'
import type { UUID } from 'node:crypto'

export interface IUsersRepository {
  findById(id: UUID): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Omit<User, 'created_at' | 'updated_at'>): Promise<User>
}
