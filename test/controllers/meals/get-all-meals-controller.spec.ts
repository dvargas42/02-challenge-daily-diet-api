import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Get All Meals (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all meals', async () => {
    const { token } = await createAndAuthenticateUser(app)

    for (let i = 1; i <= 22; i++) {
      await request(app.server)
        .post('/meals')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `TypeScript Salad ${i}`,
          description: 'Anything description...',
          date: i < 10 ? `0${i}/06/2025` : `${i}/06/2025`,
          hour: i < 10 ? `0${i}:10` : `${i}:10`,
          isInDiet: true,
        })
    }

    const response = await request(app.server)
      .get('/meals')
      .query({
        page: 2,
        pageSize: 20,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()
    console.log(response.body.meals.meals)

    expect(response.statusCode).toBe(200)
    expect(response.body.meals.total).toBe(22)
    expect(response.body.meals.totalPages).toBe(2)
    expect(response.body.meals.meals).toEqual(
      expect.objectContaining({
        '02.06.2025': expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: 'TypeScript Salad 2',
            description: 'Anything description...',
            date: '02.06.2025',
            hour: '02:10',
            isInDiet: true,
          }),
        ]),
        '01.06.2025': expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            date: '01.06.2025',
            description: 'Anything description...',
            hour: '01:10',
            isInDiet: true,
            name: 'TypeScript Salad 1',
          }),
        ]),
      }),
    )
  })
})
