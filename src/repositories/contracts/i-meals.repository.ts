import type { UUID } from 'node:crypto'

import { MealEntity } from '@/entities/meal-entity'

export type FindByUserIdParams = {
  userId: string
  page: number
  pageSize: number
}

export type CreateParams = {
  name: string
  description: string
  date: string
  hour: string
  isInDiet: boolean
  userId: UUID
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
  findByUserId(data: FindByUserIdParams): Promise<MealEntity[]>
  countByUserId(userId: string): Promise<number>
  create(data: CreateParams): Promise<MealEntity>
  save(data: MealSaveParams): Promise<MealEntity>
}
