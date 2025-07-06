import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Get Meal Metrics (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get meal metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const inDiet = [
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      false,
    ]

    for (let i = 0; i < inDiet.length; i++) {
      await request(app.server)
        .post('/meals')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `TypeScript Salad ${i + 1}`,
          description: 'Anything description...',
          date: '2025-06-01',
          hour: '10:10',
          isInDiet: inDiet[i],
        })
    }

    const response = await request(app.server)
      .get('/meals/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      metrics: expect.objectContaining({
        betterSequenceOfMeals: 5,
        totalOfMeals: 10,
        totalOfMealsAreInDiet: 7,
        totalOfMealsAreNotInDiet: 3,
      }),
    })
  })
})
