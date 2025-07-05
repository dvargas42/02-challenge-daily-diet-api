import { config } from 'dotenv'
import { z } from 'zod'

config()

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('prod'),
  DATABASE_CLIENT: z.string(),
  DATABASE_SCHEMA: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('0.0.0.0'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables: ', _env.error.format())
  throw new Error('Invalid environment variables!')
}

export const env = _env.data
