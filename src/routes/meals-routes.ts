import { FastifyInstance } from 'fastify'
import { randomUUID, UUID } from 'node:crypto'

import { knex } from '../database'
import { verifyJWT } from '../middleware/verify-jwt'
import { mealCreateValidation } from '../controllers/meals/schema/mealCreateValidation'
import { mealListAllValidation } from './schemas/meal-list-all.schema'

type Meal = {
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

export function mealsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: verifyJWT }, async (request, reply) => {
    const { name, description, date, hour, isInDiet } = mealCreateValidation(
      request.body,
    )

    const meal = await knex('meals')
      .insert({
        id: randomUUID(),
        name,
        description,
        date,
        hour,
        is_in_diet: isInDiet,
        user_id: request.user.sub,
      })
      .returning('*')

    return reply.status(201).send({ meal })
  })

  app.get('/', { onRequest: verifyJWT }, async (request, reply) => {
    const { page, pageSize } = mealListAllValidation(request.query)

    const meals = await knex('meals')
      .where('user_id', request.user.sub)
      .select('*')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .orderBy('date', 'desc')
      .orderBy('hour', 'desc')

    const [{ total }] = (await knex('meals')
      .where('user_id', request.user.sub)
      .count('* as total')) as [{ total: number }]

    const grupedByDate = meals.reduce(
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
      {} as Record<string, Meal[]>,
    )

    return reply.status(200).send({
      total,
      totalPages: Math.ceil(total / pageSize),
      meals: grupedByDate,
    })
  })

  app.get('/:id', { onRequest: verifyJWT }, async (request, reply) => {
    const { id } = request.params as { id: UUID }

    const meal = await knex('meals').where({
      user_id: request.user.sub,
      id,
    })

    return reply.status(200).send({ meal })
  })

  app.put('/:id', { onRequest: verifyJWT }, async (request, reply) => {
    const { id } = request.params as { id: UUID }
    const { name, description, date, hour, isInDiet } = mealCreateValidation(
      request.body,
    )

    const meal = await knex('meals')
      .update({
        name,
        description,
        date,
        hour,
        is_in_diet: isInDiet,
      })
      .where({
        user_id: request.user.sub,
        id,
      })
      .returning('*')

    return reply.status(200).send({ meal })
  })

  app.delete('/:id', { onRequest: verifyJWT }, async (request, reply) => {
    const { id } = request.params as { id: UUID }

    await knex('meals').delete().where({
      user_id: request.user.sub,
      id,
    })
    return reply.status(204).send()
  })

  app.get('/metrics', { onRequest: verifyJWT }, async (request, reply) => {
    const [{ totalOfMealsAreInDiet }] = (await knex('meals')
      .where({
        user_id: request.user.sub,
        is_in_diet: true,
      })
      .count('* as totalOfMealsAreInDiet')) as [
      { totalOfMealsAreInDiet: number },
    ]

    const [{ totalOfMealsAreNotInDiet }] = (await knex('meals')
      .where({
        user_id: request.user.sub,
        is_in_diet: false,
      })
      .count('* as totalOfMealsAreNotInDiet')) as [
      { totalOfMealsAreNotInDiet: number },
    ]

    const meals = await knex('meals')
      .where({
        user_id: request.user.sub,
      })
      .select('*')
      .orderBy('date', 'desc')
      .orderBy('hour', 'desc')

    let betterSequenceOfMeals = 0
    let currentSequenceOfMeals = 0

    meals.forEach((meal, index) => {
      if (index === 0 && meal.is_in_diet) {
        currentSequenceOfMeals = 1
      }
      if (index > 0 && meal.is_in_diet && meals[index - 1].is_in_diet) {
        currentSequenceOfMeals++
      }
      if (index > 0 && !meal.is_in_diet && meals[index - 1].is_in_diet) {
        if (currentSequenceOfMeals > betterSequenceOfMeals) {
          betterSequenceOfMeals = currentSequenceOfMeals
        }
        currentSequenceOfMeals = 0
      }
      if (index > 0 && meal.is_in_diet && !meals[index - 1].is_in_diet) {
        currentSequenceOfMeals = 1
      }
      if (
        index === meals.length - 1 &&
        currentSequenceOfMeals > betterSequenceOfMeals
      ) {
        betterSequenceOfMeals = currentSequenceOfMeals
      }
    })

    return reply.status(200).send({
      metrics: {
        betterSequenceOfMeals,
        totalOfMealsAreInDiet,
        totalOfMealsAreNotInDiet,
        totalOfMeals: totalOfMealsAreInDiet + totalOfMealsAreNotInDiet,
      },
    })
  })
}
