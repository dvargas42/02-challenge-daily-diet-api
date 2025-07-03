import 'dotenv/config'
import { Environment } from 'vitest/environments'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { knex } from '@/database'

export default <Environment>{
  name: 'knex',
  transformMode: 'ssr',

  async setup() {
    const schema = randomUUID()
    process.env.DATABASE_SCHEMA = schema

    await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)
    execSync('npm run knex -- migrate:latest')

    return {
      async teardown() {
        await knex.raw(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await knex.destroy()
      },
    }
  },
}
