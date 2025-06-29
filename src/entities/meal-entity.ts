import { Meal } from 'knex/types/tables'
import { UUID } from 'node:crypto'

export class MealEntity {
  constructor(
    public id: UUID,
    public name: string,
    public description: string,
    public date: string,
    public hour: string,
    public isInDiet: boolean,
    public userId: UUID,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  public static fromDatabase(data: Meal) {
    return new MealEntity(
      data.id,
      data.name,
      data.description,
      data.date,
      data.hour,
      data.is_in_diet,
      data.user_id,
      data.created_at,
      data.updated_at,
    )
  }

  public toDatabase(): Meal {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      hour: this.hour,
      is_in_diet: this.isInDiet,
      user_id: this.userId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    }
  }
}
