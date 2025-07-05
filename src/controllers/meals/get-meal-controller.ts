import { MealsRepository } from '@/repositories/meals-repository'
import { GetMealUseCase } from '@/use-cases/get-meal-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getMealSchema = z.object({
    id: z.string(),
  })

  const { id } = getMealSchema.parse(request.params)
  const userId = request.user.sub

  const mealsRespository = new MealsRepository()
  const getMealUseCase = new GetMealUseCase(mealsRespository)

  const { meal } = await getMealUseCase.execute({ id, userId })

  meal.date = new Date(meal.date).toISOString().slice(0, 10)
  meal.hour = meal.hour.slice(0, 5)

  return reply.status(200).send({
    meal,
  })
}
