import { UUID, randomUUID } from 'node:crypto'

import { Meal } from 'knex/types/tables'
import { MealEntity } from '@/entities/meal-entity'
import {
  CreateParams,
  FindByUserIdParams,
  IMealsRepository,
  MealSaveParams,
} from '@/repositories/contracts/i-meals.repository'

export class InMemoryMealsRepository implements IMealsRepository {
  private meals: Meal[] = []

  async findByUserId({
    userId,
    page,
    pageSize,
  }: FindByUserIdParams): Promise<MealEntity[]> {
    const mealsFound = this.meals
      .filter((meal) => meal.user_id === userId)
      .slice((page - 1) * pageSize, page * pageSize)

    return mealsFound.map((meal) => {
      return MealEntity.fromDatabase(meal)
    })
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<MealEntity | null> {
    const meal = this.meals.find(
      (meal) => meal.id === id && meal.user_id === userId,
    )

    if (!meal) {
      return null
    }

    return MealEntity.fromDatabase(meal)
  }

  async findByUserIdOrderByDateDescAndHourDesc(
    userId: UUID,
  ): Promise<MealEntity[]> {
    const meals = this.meals
      .filter((meal) => meal.user_id === userId)
      .sort((a, b) => {
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date)
        }
        return b.hour.localeCompare(a.hour)
      })
    return meals.map((meal) => MealEntity.fromDatabase(meal))
  }

  async countByUserId(userId: string): Promise<number> {
    const mealFiltered = this.meals.filter((meal) => meal.user_id === userId)

    return mealFiltered.length
  }

  async countByUserIdAndIsInDiet(
    userId: UUID,
    isInDiet: boolean,
  ): Promise<number> {
    const filteredMeals = this.meals.filter(
      (meal) => meal.user_id === userId && meal.is_in_diet === isInDiet,
    )
    return filteredMeals.length
  }

  async create(data: CreateParams): Promise<MealEntity> {
    const meal: Meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      date: data.date,
      hour: data.hour,
      is_in_diet: data.isInDiet,
      user_id: data.userId,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    }

    this.meals.push(meal)

    return MealEntity.fromDatabase(meal)
  }

  async save(data: MealSaveParams): Promise<MealEntity> {
    let mealIndex: number = -1

    const mealFound = this.meals.find((meal, index) => {
      if (meal.id === data.id && meal.user_id === data.userId) {
        mealIndex = index
        return true
      }
      return false
    }) as Meal

    const meal = {
      id: mealFound.id,
      description: data.description,
      name: data.name,
      date: data.date,
      hour: data.hour,
      is_in_diet: data.isInDiet,
      user_id: mealFound.user_id,
      created_at: mealFound.created_at,
      updated_at: mealFound.updated_at,
    }

    this.meals[mealIndex] = meal

    return MealEntity.fromDatabase(meal)
  }

  async delete(id: UUID, userId: UUID): Promise<void> {
    const mealIndex = this.meals.findIndex(
      (meal) => meal.id === id && meal.user_id === userId,
    )

    if (mealIndex >= 0) {
      this.meals.splice(mealIndex, 1)
    }
  }
}
