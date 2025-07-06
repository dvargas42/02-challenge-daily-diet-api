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

  async findByIdAndUserId(id: UUID, userId: UUID): Promise<MealEntity | null> {
    const meal = await knex('meals')
      .where({
        user_id: userId,
        id,
      })
      .returning('*')
      .first()

    if (!meal) {
      return null
    }

    return MealEntity.fromDatabase(meal)
  }

  async findByUserIdOrderByDateDescAndHourDesc(
    userId: UUID,
  ): Promise<MealEntity[]> {
    const meals = await knex('meals')
      .where({
        user_id: userId,
      })
      .select('*')
      .orderBy('date', 'desc')
      .orderBy('hour', 'desc')

    return meals.map((meal) => MealEntity.fromDatabase(meal))
  }

  async countByUserId(userId: string): Promise<number> {
    const [{ total }] = (await knex('meals')
      .where('user_id', userId)
      .count('* as total')) as [{ total: number }]

    return total
  }

  async countByUserIdAndIsInDiet(
    userId: UUID,
    isInDiet: boolean,
  ): Promise<number> {
    const [{ total }] = (await knex('meals')
      .where({
        user_id: userId,
        is_in_diet: isInDiet,
      })
      .count('* as total')) as [{ total: string }]

    return parseInt(total, 10)
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

  async save({
    id,
    name,
    description,
    date,
    hour,
    isInDiet,
    userId,
  }: MealSaveParams): Promise<MealEntity> {
    const [meal] = await knex('meals')
      .update({
        name,
        description,
        date,
        hour,
        is_in_diet: isInDiet,
      })
      .where({
        user_id: userId,
        id,
      })
      .returning('*')

    return MealEntity.fromDatabase(meal)
  }

  async delete(id: UUID, userId: UUID): Promise<void> {
    await knex('meals').where({ id, user_id: userId }).delete()
  }
}
