/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['__test__/**/*.test.ts'],
    globals: true,
    environment: 'node',
  }
})
