import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getMealValidation } from './schema/get-meal-validation'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'

export async function deleteMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const { id } = getMealValidation(request.params)

  const deleteMealUseCase = makeDeleteMealUseCase()

  await deleteMealUseCase.execute({ id, userId })

  return reply.status(204).send()
}
