import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/middleware/verify-jwt'
import { createMealController } from './create-meal-controller'
import { getAllMealsController } from './get-all-meals-controller'
import { getMealController } from './get-meal-controller'
import { getMealMetricsController } from './get-meal-metrics-controller'
import { deleteMealController } from './delete-meal-controller'
import { updateMealController } from './update-meal-controller'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', { onRequest: verifyJWT }, createMealController)
  app.get('/meals', { onRequest: verifyJWT }, getAllMealsController)
  app.get('/meals/:id', { onRequest: verifyJWT }, getMealController)
  app.get('/meals/metrics', { onRequest: verifyJWT }, getMealMetricsController)
  app.delete('/meals/:id', { onRequest: verifyJWT }, deleteMealController)
  app.put('/meals/:id', { onRequest: verifyJWT }, updateMealController)
}
