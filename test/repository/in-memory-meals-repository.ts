import {
  IMealsRepository,
  MealParams,
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
}
