import nodeFs from 'node:fs';
import { resolve } from 'node:path';
import { CONFIG } from './src/config.js';

// CHANGED: Point to tmp directory instead of original
const testDir = CONFIG.paths.hmrFullBundleModeDir;

/**
 * Edit a file using Node.js fs module
 * Files are edited in the tmp directory, not the original source
 */
export async function editFile(
  filename: string,
  replacer: (content: string) => string,
): Promise<void> {
  const filePath = resolve(testDir, filename);

  // Read current content from tmp
  const content = nodeFs.readFileSync(filePath, 'utf-8');

  // Apply transformation
  const newContent = replacer(content);

  // Write back to tmp
  nodeFs.writeFileSync(filePath, newContent, 'utf-8');
}

/**
 * Get the Playwright page from global context
 */
export function getPage() {
  const page = (global as any).__page;
  if (!page) {
    throw new Error(
      'Playwright page not initialized. Check vitest-setup-playwright.ts',
    );
  }
  return page;
}
