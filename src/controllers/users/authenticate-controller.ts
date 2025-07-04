import { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { authenticateValidation } from './schema/authenticateValidation'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateValidation(request.body)
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.excute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
