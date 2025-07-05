import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

import { env } from './env'
import { usersRoutes } from './controllers/users/routes'
import { mealsRoutes } from './controllers/meals/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1d',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(mealsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }
  return reply.status(500).send({ message: error.message })
})
