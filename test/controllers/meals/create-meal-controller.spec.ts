import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Create Meal (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'TypeScript Salad',
        description: 'Anything description...',
        date: '01/06/2025',
        hour: '10:10',
        isInDiet: true,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.meal).toEqual(
      expect.objectContaining({
        name: 'TypeScript Salad',
        description: 'Anything description...',
        date: '2025-06-01',
        hour: '10:10',
        isInDiet: true,
      }),
    )
  })
})
