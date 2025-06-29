import { MealEntity } from '@/entities/meal-entity'
import { Meal } from 'knex/types/tables'
import type { UUID } from 'node:crypto'

export type MealParams = {
  name: string
  description: string
  date: string
  hour: string
  is_in_diet: boolean
  user_id: UUID
}

export type MealSaveParams = {
  id: UUID
  name: string
  description: string
  date: string
  hour: string
  isInDiet: boolean
  userId: UUID
}

export interface IMealsRepository {
  findByIdAndUserId(id: string, userId: string): Promise<MealEntity | null>
  findByUserId(userId: string, page: number, pageSize: number): Promise<Meal[]>
  countByUserId(userId: string): Promise<number>
  create(data: MealParams): Promise<Meal>
  save(data: MealSaveParams): Promise<MealEntity>
}
