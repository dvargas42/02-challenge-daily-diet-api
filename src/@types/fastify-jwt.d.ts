import '@fastify/jwt'
import { UUID } from 'node:crypto'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: UUID
    }
  }
}
