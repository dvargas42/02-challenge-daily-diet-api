// eslint-disable-next-line
import { Knex } from 'knex'
import { UUID } from 'node:crypto'

declare module 'knex/types/tables' {
  interface User {
    id: UUID
    name: string
    email: string
    password: string
    created_at: string
    updated_at: string
  }

  interface Meal {
    id: UUID
    name: string
    description: string
    date: Date
    hour: Time
    is_in_diet: boolean
    user_id: UUID
    created_at: string
    updated_at: string
  }

  export interface Tables {
    users: User
    meals: Meal
  }
}
