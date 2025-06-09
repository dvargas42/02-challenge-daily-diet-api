import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './routes/users-routes'

const app = fastify()

app.register(usersRoutes, { prefix: 'users' })

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
  console.log('HTTP server is running')
})
