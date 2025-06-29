import type { UUID } from 'node:crypto'

import { UserEntity } from '@/entities/user-entity'

export type CreateParams = {
  name: string
  email: string
  password: string
}

export interface IUsersRepository {
  findById(id: UUID): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  create(data: CreateParams): Promise<UserEntity>
}
