import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      '**/*.browser.{test,spec}.ts',
    ],
    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [
        { browser: 'chromium' },
      ],
    },
    setupFiles: ['./vitest-setup.ts'],
  },
});
