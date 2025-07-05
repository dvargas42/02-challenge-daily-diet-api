import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Refresh (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'Test@1234',
    })

    const authResponse = await request(app.server)
      .post('/users/sessions')
      .send({
        email: 'john@doe.com',
        password: 'Test@1234',
      })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error()
    }

    const response = await request(app.server)
      .patch('/users/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
