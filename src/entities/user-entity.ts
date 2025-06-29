import { User } from 'knex/types/tables'
import { UUID } from 'node:crypto'

export class UserEntity {
  constructor(
    public id: UUID,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  public static fromDatabase(data: User) {
    return new UserEntity(
      data.id,
      data.name,
      data.email,
      data.password,
      data.created_at,
      data.updated_at,
    )
  }

  public toDatabase(): User {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
