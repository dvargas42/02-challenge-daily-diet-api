import { UUID } from 'node:crypto'

import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'

type GetMealMetricsInput = {
  userId: UUID
}

type GetMealMetricsOuput = {
  metrics: {
    betterSequenceOfMeals: number
    totalOfMealsAreInDiet: number
    totalOfMealsAreNotInDiet: number
    totalOfMeals: number
  }
}

export class GetMealMetricsUseCase {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({ userId }: GetMealMetricsInput): Promise<GetMealMetricsOuput> {
    const totalOfMealsAreInDiet =
      await this.mealsRepository.countByUserIdAndIsInDiet(userId, true)

    const totalOfMealsAreNotInDiet =
      await this.mealsRepository.countByUserIdAndIsInDiet(userId, false)

    const meals =
      await this.mealsRepository.findByUserIdOrderByDateDescAndHourDesc(userId)

    let betterSequenceOfMeals = 0
    let currentSequenceOfMeals = 0

    meals.forEach((meal, index) => {
      if (index === 0 && meal.isInDiet) {
        currentSequenceOfMeals = 1
      }
      if (index > 0 && meal.isInDiet && meals[index - 1].isInDiet) {
        currentSequenceOfMeals++
      }
      if (index > 0 && !meal.isInDiet && meals[index - 1].isInDiet) {
        if (currentSequenceOfMeals > betterSequenceOfMeals) {
          betterSequenceOfMeals = currentSequenceOfMeals
        }
        currentSequenceOfMeals = 0
      }
      if (index > 0 && meal.isInDiet && !meals[index - 1].isInDiet) {
        currentSequenceOfMeals = 1
      }
      if (
        index === meals.length - 1 &&
        currentSequenceOfMeals > betterSequenceOfMeals
      ) {
        betterSequenceOfMeals = currentSequenceOfMeals
      }
    })

    return {
      metrics: {
        betterSequenceOfMeals,
        totalOfMealsAreInDiet,
        totalOfMealsAreNotInDiet,
        totalOfMeals: totalOfMealsAreInDiet + totalOfMealsAreNotInDiet,
      },
    }
  }
}
