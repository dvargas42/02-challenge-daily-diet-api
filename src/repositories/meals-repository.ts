import { randomUUID, UUID } from 'node:crypto'

import { MealEntity } from '@/entities/meal-entity'
import {
  CreateParams,
  FindByUserIdParams,
  IMealsRepository,
  MealSaveParams,
} from './contracts/i-meals.repository'
import { knex } from '@/database'

export class MealsRepository implements IMealsRepository {
  async findByUserId({
    userId,
    page,
    pageSize,
  }: FindByUserIdParams): Promise<MealEntity[]> {
    const meals = await knex('meals')
      .where('user_id', userId)
      .select('*')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .orderBy('date', 'desc')
      .orderBy('hour', 'desc')

    return meals.map((meal) => MealEntity.fromDatabase(meal))
  }

  findByIdAndUserId(id: string, userId: string): Promise<MealEntity | null> {
    throw new Error('Method not implemented.')
  }

  findByUserIdOrderByDateDescAndHourDesc(userId: UUID): Promise<MealEntity[]> {
    throw new Error('Method not implemented.')
  }

  async countByUserId(userId: string): Promise<number> {
    const [{ total }] = (await knex('meals')
      .where('user_id', userId)
      .count('* as total')) as [{ total: number }]

    return total
  }

  countByUserIdAndIsInDiet(userId: UUID, isInDiet: boolean): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async create({
    name,
    description,
    date,
    hour,
    isInDiet,
    userId,
  }: CreateParams): Promise<MealEntity> {
    const [meal] = await knex('meals')
      .insert({
        id: randomUUID(),
        name,
        description,
        date,
        hour,
        is_in_diet: isInDiet,
        user_id: userId,
      })
      .returning('*')

    return MealEntity.fromDatabase(meal)
  }

  save(data: MealSaveParams): Promise<MealEntity> {
    throw new Error('Method not implemented.')
  }

  delete(id: UUID, userId: UUID): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
