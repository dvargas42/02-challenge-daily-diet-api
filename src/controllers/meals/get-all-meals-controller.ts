import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { GetAllMealsUseCase } from '@/use-cases/get-all-meals-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAllMealsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllMealSchema = z.object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  })

  const userId = request.user.sub
  const { page, pageSize } = getAllMealSchema.parse(request.query)

  const usersRepository = new UsersRepository()
  const mealsRepository = new MealsRepository()
  const getAllMealsUseCase = new GetAllMealsUseCase(
    mealsRepository,
    usersRepository,
  )

  const meals = await getAllMealsUseCase.execute({
    userId,
    page,
    pageSize,
  })

  return reply.status(200).send({
    meals,
  })
}
