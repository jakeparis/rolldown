import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 1000 * 20,
    // Include Node.js test files (*.spec.ts, not *.browser.test.ts)
    include: ['**/*.spec.{js,ts}'],

    // Standard Node.js test environment
    environment: 'node',

    // Global setup for copying files to tmp
    globalSetup: ['./vitest-global-setup.ts'],

    // Setup file that starts dev server and creates Playwright page
    setupFiles: ['./vitest-setup-playwright.ts'],

    // Increase timeout for HMR tests (server startup + file watching)
    testTimeout: 90000,
  },
});
