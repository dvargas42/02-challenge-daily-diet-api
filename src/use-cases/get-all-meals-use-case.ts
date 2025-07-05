import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { UUID } from 'node:crypto'

type GetAllMealInput = {
  userId: UUID
  page: number
  pageSize: number
}

type GetAllMealOutput = {
  meals: Record<string, MealReduced[]>
  totalPages: number
  total: number
}

type MealReduced = {
  id: UUID
  name: string
  description: string
  date: string
  hour: string
  isInDiet: boolean
}

function parseDate(date: string) {
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}

export class GetAllMealsUseCase {
  constructor(
    private mealsRepository: IMealsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    page,
    pageSize,
  }: GetAllMealInput): Promise<GetAllMealOutput> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const total = await this.mealsRepository.countByUserId(userId)
    const foundMeals = await this.mealsRepository.findByUserId({
      userId,
      page,
      pageSize,
    })

    const meals = foundMeals.map((meal) => {
      return {
        id: meal.id,
        name: meal.name,
        description: meal.description,
        date: meal.date.toISOString().slice(0, 10),
        hour: meal.hour.slice(0, 5),
        isInDiet: meal.isInDiet,
      }
    })

    const mealGrupedByDate = meals.reduce(
      (acc, _meal) => {
        const date = parseDate(_meal.date)

        if (!acc[date]) {
          acc[date] = []
        }
        const meal = {
          id: _meal.id,
          name: _meal.name,
          description: _meal.description,
          date,
          hour: _meal.hour,
          isInDiet: _meal.isInDiet,
        }
        acc[date].push(meal)
        return acc
      },
      {} as Record<string, MealReduced[]>,
    )

    return {
      meals: mealGrupedByDate,
      totalPages: Math.ceil(total / pageSize),
      total: Number(total),
    }
  }
}
