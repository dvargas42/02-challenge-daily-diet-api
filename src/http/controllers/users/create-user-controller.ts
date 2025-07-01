import { FastifyReply, FastifyRequest } from 'fastify'

import { createUserValidation } from './schema/createUserValidation'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBody = createUserValidation(request.body)
  const createUserUseCase = makeCreateUserUseCase()

  await createUserUseCase.execute(requestBody)

  return reply.status(201).send()
}
