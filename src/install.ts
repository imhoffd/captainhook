import { copyFile } from 'fs/promises';
import path from 'path';

import type { Context } from './lib/cli';
import { checkHook } from './lib/hooks';
import { readFile } from './util/fs/encased';
import { log } from './util/log';

export const run = async (ctx: Context): Promise<void> => {
  await installRunner(ctx);
  await Promise.all(ctx.hooks.map(hook => installHook(ctx, hook)));

  log('done! use "npx captainhook uninstall" to uninstall');
};

const installRunner = async (ctx: Context): Promise<void> => {
  const p = path.resolve(ctx.hooksDir, path.basename(ctx.assets.runnerFile));

  log(`writing ${path.relative(ctx.projectDir, p)}`);
  await copyFile(ctx.assets.runnerFile, p);
};

const installHook = async (ctx: Context, hook: string): Promise<void> => {
  const p = path.resolve(ctx.hooksDir, hook);
  const result = await readFile(p, { encoding: 'utf8' });

  if (result.ok && !checkHook(result.value.toString())) {
    log(`NOT overwriting custom ${hook} hook`);
    return;
  }

  await copyHook(ctx, p);
};

const copyHook = async (ctx: Context, p: string): Promise<void> => {
  log(`writing ${path.relative(ctx.projectDir, p)}`);
  await copyFile(ctx.assets.hookFile, p);
};
