import { randomUUID, UUID } from 'node:crypto'

import { knex } from '@/database'
import { UserEntity } from '@/entities/user-entity'
import { CreateParams, IUsersRepository } from './contracts/i-users-repository'

export class UsersRepository implements IUsersRepository {
  async findById(id: UUID): Promise<UserEntity | null> {
    const user = await knex('users').where({ id }).returning('*').first()

    if (!user) {
      return null
    }

    return UserEntity.fromDatabase(user)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await knex('users').where({ email }).returning('*').first()

    if (!user) {
      return null
    }

    return UserEntity.fromDatabase(user)
  }

  async create({ name, email, password }: CreateParams): Promise<UserEntity> {
    const [user] = await knex('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        password,
      })
      .returning('*')

    return UserEntity.fromDatabase(user)
  }
}
