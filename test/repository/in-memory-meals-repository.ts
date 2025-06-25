import {
  IMealsRepository,
  MealParams,
} from '@/repositories/contracts/i-meals.repository'
import { Meal } from 'knex/types/tables'
import { randomUUID } from 'node:crypto'

export class InMemoryMealsRepository implements IMealsRepository {
  private meals: Meal[] = []

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
