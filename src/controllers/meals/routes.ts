import { FastifyInstance } from 'fastify'
import { createMealController } from './create-meal-controller'
import { verifyJWT } from '@/middleware/verify-jwt'
import { getAllMealsController } from './get-all-meals-controller'
import { getMealController } from './get-meal-controller'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', { onRequest: verifyJWT }, createMealController)
  app.get('/meals', { onRequest: verifyJWT }, getAllMealsController)
  app.get('/meals/:id', { onRequest: verifyJWT }, getMealController)
}
