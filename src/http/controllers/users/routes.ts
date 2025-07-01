import { FastifyInstance } from 'fastify'
import { createUserController } from './create-user-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
}
