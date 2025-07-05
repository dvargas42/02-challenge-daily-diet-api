import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'Test@1234',
  })

  const response = await request(app.server).post('/users/sessions').send({
    email: 'john@doe.com',
    password: 'Test@1234',
  })

  const { token } = response.body

  return { token }
}
