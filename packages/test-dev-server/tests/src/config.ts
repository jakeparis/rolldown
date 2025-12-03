import nodeAssert from 'node:assert';
import nodePath from 'node:path';

import { getDevWatchOptionsForCi } from '@rolldown/test-dev-server';

// `/packages/test-dev-server/tests`
const testsDir = nodePath.resolve(import.meta.dirname, '..').normalize();
nodeAssert.ok(testsDir.endsWith('test-dev-server/tests'));

export const CONFIG = {
  paths: {
    testsDir,
    hmrFullBundleModeDir: nodePath.join(
      testsDir,
      'browser/hmr-full-bundle-mode',
    ),
    tmpFullBundleModeDir: nodePath.join(
      testsDir,
      'tmp',
      'hmr-full-bundle-mode',
    ),
  },
  watch: getDevWatchOptionsForCi(),
};
