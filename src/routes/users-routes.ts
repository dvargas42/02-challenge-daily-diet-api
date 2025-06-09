import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'

import { userCreateValidation } from './schemas/user-create.schema'
import { userLoginValidation } from './schemas/user-login.schema'

export function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { name, email, password } = userCreateValidation(request.body)

    const user = await knex('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        password,
      })
      .returning('*')

    return reply.status(201).send({ user })
  })

  app.post('/login', async (request, reply) => {
    const { email, password } = userLoginValidation(request.body)

    const user = await knex('users').where({ email, password }).select().first()

    if (!user) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }

    return reply.status(200).send({ user })
  })
}
