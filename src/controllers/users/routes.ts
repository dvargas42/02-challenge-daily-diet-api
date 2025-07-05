import { FastifyInstance } from 'fastify'
import { createUserController } from './create-user-controller'
import { authenticateController } from './authenticate-controller'
import { refreshController } from './refresh-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
  app.post('/users/sessions', authenticateController)
  app.patch('/users/refresh', refreshController)
}
