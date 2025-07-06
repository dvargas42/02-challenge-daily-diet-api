import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Update Meal (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to update meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createResponse = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TypeScript Salad',
        description: 'Anything description...',
        date: '2025-06-01',
        hour: '10:10',
        isInDiet: true,
      })

    const { meal } = createResponse.body

    const response = await request(app.server)
      .put(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'JavaScript Hamburger',
        description: 'Anything description...',
        date: '2025-06-01',
        hour: '10:10',
        isInDiet: false,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      meal: expect.objectContaining({
        name: 'JavaScript Hamburger',
        description: 'Anything description...',
        date: '2025-06-01',
        hour: '10:10',
        isInDiet: false,
      }),
    })
  })
})
