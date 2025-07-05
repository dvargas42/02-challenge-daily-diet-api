import { FastifyReply, FastifyRequest } from 'fastify'

import { getAllMealValidation } from './schema/get-all-meal-validation'
import { makeGetAllMealsUseCase } from '@/use-cases/factories/make-get-all-meals-use-case'

export async function getAllMealsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const { page, pageSize } = getAllMealValidation(request.query)

  const getAllMealsUseCase = makeGetAllMealsUseCase()

  const meals = await getAllMealsUseCase.execute({
    userId,
    page,
    pageSize,
  })

  return reply.status(200).send({
    meals,
  })
}
