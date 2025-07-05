import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { createMealValidation } from './schema/create-meal-validation'

export async function createMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const { name, description, date, hour, isInDiet } = createMealValidation(
    request.body,
  )
  const createMealUseCase = makeCreateMealUseCase()

  const { meal } = await createMealUseCase.execute({
    name,
    description,
    date,
    hour,
    isInDiet,
    userId,
  })

  return reply.status(201).send({
    meal,
  })
}
