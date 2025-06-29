import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMealsRepository } from '@/repositories/contracts/i-meals.repository'
import { IUsersRepository } from '@/repositories/contracts/i-users-repository'
import { UUID } from 'node:crypto'

type GetAllMealUseCaseRequest = {
  userId: UUID
  page: number
  pageSize: number
}

type GetAllMealUseCaseResponse = {
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
  }: GetAllMealUseCaseRequest): Promise<GetAllMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const total = await this.mealsRepository.countByUserId(userId)
    const meals = await this.mealsRepository.findByUserId(
      userId,
      page,
      pageSize,
    )

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
          isInDiet: _meal.is_in_diet,
        }
        acc[date].push(meal)
        return acc
      },
      {} as Record<string, MealReduced[]>,
    )

    return {
      meals: mealGrupedByDate,
      totalPages: Math.ceil(total / pageSize),
      total,
    }
  }
}
