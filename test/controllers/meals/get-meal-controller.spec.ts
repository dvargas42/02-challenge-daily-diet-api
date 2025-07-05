import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Get Meal (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get expecific meal ', async () => {})
})
