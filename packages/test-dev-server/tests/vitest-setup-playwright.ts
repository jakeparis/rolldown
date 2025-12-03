import '@testing-library/jest-dom/vitest';
import { execa } from 'execa';
import killPort from 'kill-port';
import type { ChildProcess } from 'node:child_process';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { afterAll, beforeAll } from 'vitest';
import { CONFIG } from './src/config';

// Use tmp directory for tests

async function startDevServer() {
  console.log(`🔄 - Killing any process running on port 3000...`);
  try {
    await killPort(3000);
  } catch (err) {
    if (
      err instanceof Error && err.message.includes('No process running')
    ) {
      console.log(`🔄 - No process running on port 3000`);
    } else {
      throw err;
    }
  }
  execa('pnpm serve', {
    cwd: CONFIG.paths.hmrFullBundleModeDir, // CHANGED: Use tmp directory instead of original
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit'],
    env: {
      RUST_BACKTRACE: 'FULL',
      RD_LOG: process.env.RD_LOG || 'hmr=debug',
    },
  });

  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 3000)
  );
}

let devServerProcess: ChildProcess | null = null;
let browser: Browser | null = null;
let page: Page | null = null;

/**
 * Before all tests: Start dev server and create browser page
 */
beforeAll(async () => {
  console.log('Starting dev server and launching browser...');
  // Start dev server from tmp directory
  await startDevServer();

  // Launch Playwright browser
  browser = await chromium.launch({
    headless: !!process.env.HEADLESS || false, // Can be controlled via env var
  });

  // Create new page
  page = await browser.newPage();

  // Navigate to dev server
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Make page available to tests
  (global as any).__page = page;
});

/**
 * After all tests: Clean up resources
 */
afterAll(async () => {
  // Close page
  if (page) {
    await page.close();
    page = null;
  }

  // Close browser
  if (browser) {
    await browser.close();
    browser = null;
  }

  // Kill dev server
  if (devServerProcess) {
    devServerProcess.kill('SIGTERM');
    devServerProcess = null;
  }
});
