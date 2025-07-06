import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Delete Meal (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete meal', async () => {
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
      .delete(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
  })
})
