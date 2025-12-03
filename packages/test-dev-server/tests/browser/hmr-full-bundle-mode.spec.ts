import { expect, test } from 'vitest';
import { editFile, getPage } from '../test-utils';

test('should render initial content', async () => {
  const page = getPage();

  const headingText = await page.textContent('h1');
  expect(headingText).toBe('HMR Full Bundle Mode');

  const appText = await page.textContent('.app');
  expect(appText).toBe('hello');

  const hmrText = await page.textContent('.hmr');
  expect(hmrText).toBe('hello');
});

test.skip('HMR update without full reload', async () => {
  const page = getPage();

  // Initial state
  const initialHmrText = await page.textContent('.hmr');
  expect(initialHmrText).toBe('hello');

  // Edit HMR-enabled file using Node.js fs
  await editFile(
    'hmr.js',
    (code) =>
      code.replace(
        "export const foo = 'hello'",
        "export const foo = 'updated'",
      ),
  );

  // Wait for HMR update using Playwright's waitForFunction
  await page.waitForFunction(
    () => {
      const el = document.querySelector('.hmr');
      return el?.textContent === 'updated';
    },
    { timeout: 5000 },
  );

  // Verify HMR updated the content
  const updatedHmrText = await page.textContent('.hmr');
  expect(updatedHmrText).toBe('updated');

  // Verify app content unchanged (no full reload)
  const appText = await page.textContent('.app');
  expect(appText).toBe('hello');

  // Restore original content
  await editFile(
    'hmr.js',
    (code) =>
      code.replace(
        "export const foo = 'updated'",
        "export const foo = 'hello'",
      ),
  );

  // Wait for restoration
  await page.waitForFunction(
    () => {
      const el = document.querySelector('.hmr');
      return el?.textContent === 'hello';
    },
    { timeout: 5000 },
  );

  const restoredHmrText = await page.textContent('.hmr');
  expect(restoredHmrText).toBe('hello');
});
