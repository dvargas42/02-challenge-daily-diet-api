import { makeGetMealMetrics } from '@/use-cases/factories/make-get-meal-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getMealMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub
  const getMealMetricsUseCase = makeGetMealMetrics()

  const { metrics } = await getMealMetricsUseCase.execute({ userId })

  return reply.status(200).send({
    metrics,
  })
}
