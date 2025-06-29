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

export interface IMealsRepository {
  findByUserId(userId: string, page: number, pageSize: number): Promise<Meal[]>
  countByUserId(userId: string): Promise<number>
  create(data: MealParams): Promise<Meal>
}
