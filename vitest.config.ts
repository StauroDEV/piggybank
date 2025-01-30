import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./tests/setup.ts'],
    globalSetup: './tests/globalSetup.ts',
    hookTimeout: 25_000,
    coverage: {
      provider: 'v8',
      reporter: 'lcov',
    },
  },
})
