import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'
import { mealCreateValidation } from './schema/mealCreateValidation'

export async function createMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const { name, description, date, hour, isInDiet } = mealCreateValidation(
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
    meal: {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      date: new Date(meal.date).toISOString().slice(0, 10),
      hour: meal.hour.slice(0, 5),
      isInDiet: meal.isInDiet,
    },
  })
}
