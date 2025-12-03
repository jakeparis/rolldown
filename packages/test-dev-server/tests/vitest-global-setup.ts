/**
 * Global setup: Copy test fixtures to tmp directory
 */
export async function setup(): Promise<void> {
  // console.log('Setting up test fixtures in tmp directory...');

  // // Clean up old tmp directory
  // await rm(CONFIG.paths.tmpFullBundleModeDir, { recursive: true, force: true });

  // // Create fresh tmp directory
  // await mkdir(CONFIG.paths.tmpFullBundleModeDir, { recursive: true });

  // // Copy hmr-full-bundle-mode to tmp

  // await cp(
  //   CONFIG.paths.hmrFullBundleModeDir,
  //   CONFIG.paths.tmpFullBundleModeDir,
  //   {
  //     recursive: true,
  //     dereference: false,
  //     filter(file) {
  //       // Exclude .spec.ts test files (only copy source files)
  //       return !file.endsWith('.spec.ts');
  //     },
  //   },
  // );

  // console.log(`Copied hmr-full-bundle-mode → tmp/hmr-full-bundle-mode`);
}

/**
 * Global teardown: Clean up tmp directory
 */
export async function teardown(): Promise<void> {
  // console.log('Cleaning up tmp directory...');

  // // Allow preserving tmp for debugging
  // if (!process.env.PRESERVE_TMP) {
  //   await rm(tmpDir, { recursive: true, force: true });
  //   console.log('Deleted tmp directory');
  // } else {
  //   console.log('Preserved tmp directory (PRESERVE_TMP is set)');
  // }
}
