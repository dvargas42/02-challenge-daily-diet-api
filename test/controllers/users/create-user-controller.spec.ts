import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Create User (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Test@1234',
    })
    expect(response.status).toEqual(201)
  })

  it('should not be able to register user when email is already registered', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Test@1234',
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'Test@1234',
    })

    expect(response.status).toEqual(500)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'E-mail already exists.',
      }),
    )
  })
})
