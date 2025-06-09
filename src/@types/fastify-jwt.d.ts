import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: `${string}-${string}-${string}-${string}-${string}`
    }
  }
}
