import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'Test@1234',
    })

    const response = await request(app.server).post('/users/sessions').send({
      email: 'john@doe.com',
      password: 'Test@1234',
    })

    expect(response.status).toBe(200)
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
