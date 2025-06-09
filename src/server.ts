import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { usersRoutes } from './routes/users-routes'
import { mealsRoutes } from './routes/meals-routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '1d' },
})

app.register(fastifyCookie)

app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
  console.log('🚀 HTTP server is running')
})
