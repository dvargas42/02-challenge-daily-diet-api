import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetMealUseCase } from '@/use-cases/factories/make-get-meal-use-case'
import { getMealValidation } from './schema/get-meal-validation'

export async function getMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = getMealValidation(request.params)
  const userId = request.user.sub

  const getMealUseCase = makeGetMealUseCase()

  const { meal } = await getMealUseCase.execute({ id, userId })

  meal.date = new Date(meal.date).toISOString().slice(0, 10)
  meal.hour = meal.hour.slice(0, 5)

  return reply.status(200).send({
    meal,
  })
}
