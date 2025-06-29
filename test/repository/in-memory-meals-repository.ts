import { MealEntity } from '@/entities/meal-entity'
import {
  IMealsRepository,
  MealParams,
  MealSaveParams,
} from '@/repositories/contracts/i-meals.repository'
import { Meal } from 'knex/types/tables'
import { randomUUID } from 'node:crypto'

export class InMemoryMealsRepository implements IMealsRepository {
  private meals: Meal[] = []

  async findByIdAndUserId(id: string, userId: string): Promise<Meal | null> {
    const meal = this.meals.find(
      (meal) => meal.id === id && meal.user_id === userId,
    )

    if (!meal) {
      return null
    }

    return meal
  }

  async findByUserId(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<Meal[]> {
    const mealFound = this.meals
      .filter((meal) => meal.user_id === userId)
      .slice((page - 1) * pageSize, page * pageSize)

    return mealFound
  }

  async countByUserId(id: string): Promise<number> {
    const mealFiltered = this.meals.filter((meal) => meal.user_id === id)

    return mealFiltered.length
  }

  async create(data: MealParams): Promise<Meal> {
    const meal = {
      id: randomUUID(),
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      ...data,
    }

    this.meals.push(meal)

    return meal
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
}
