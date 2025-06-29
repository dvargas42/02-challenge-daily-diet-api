import { UserEntity } from '@/entities/user-entity'
import { User } from 'knex/types/tables'
import type { UUID } from 'node:crypto'

export type CreateParams = {
  name: string
  email: string
  password: string
}

export interface IUsersRepository {
  findById(id: UUID): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateParams): Promise<UserEntity>
}
