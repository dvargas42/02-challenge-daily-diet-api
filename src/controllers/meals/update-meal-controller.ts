import { FastifyReply, FastifyRequest } from 'fastify'
import { UUID } from 'node:crypto'

import { makeUpdateMealUseCase } from '@/use-cases/factories/make-update-meal-use-case'
import { createMealValidation } from './schema/create-meal-validation'
import { getMealValidation } from './schema/get-meal-validation'

export async function updateMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const { id } = getMealValidation(request.params)
  const { name, description, date, hour, isInDiet } = createMealValidation(
    request.body,
  )

  const updateMealUseCase = makeUpdateMealUseCase()

  const { meal } = await updateMealUseCase.execute({
    id: id as UUID,
    name,
    description,
    date: date.toString(),
    hour,
    isInDiet,
    userId,
  })

  return reply.status(200).send({
    meal,
  })
}
