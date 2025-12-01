import { defineTest } from 'rolldown-tests';
import { getOutputChunk } from 'rolldown-tests/utils';
import { expect } from 'vitest';

let referenceId: string;

export default defineTest({
  config: {
    plugins: [
      {
        name: 'test-emit-prebuilt-chunk',
        buildStart() {
          referenceId = this.emitFile({
            type: 'prebuilt-chunk',
            fileName: 'prebuilt.js',
            code: 'console.log("prebuilt chunk");',
            exports: ['default'],
          });
        },
        generateBundle() {
          expect(this.getFileName(referenceId)).toBe('prebuilt.js');
        },
      },
    ],
  },
  afterTest: (output) => {
    const chunks = getOutputChunk(output);
    const prebuiltChunk = chunks.find((c) => c.fileName === 'prebuilt.js');
    expect(prebuiltChunk).toBeDefined();
    expect(prebuiltChunk!.code).toBe('console.log("prebuilt chunk");');
    expect(prebuiltChunk!.exports).toStrictEqual(['default']);
  },
});
