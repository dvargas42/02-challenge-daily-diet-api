import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'teste',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'test/use-cases',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'test/controllers',
          environment: './db/vitest-environment/knex-test-environment.ts',
        },
      },
    ],
  },
})
