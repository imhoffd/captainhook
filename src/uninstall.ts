import path from 'path';

import type { Context } from './lib/cli';
import { checkHook } from './lib/hooks';
import { stat, unlink, readFile } from './util/fs/encased';
import { log } from './util/log';

export const run = async (ctx: Context): Promise<void> => {
  await uninstallRunner(ctx);
  await Promise.all(ctx.hooks.map(hook => uninstallHook(ctx, hook)));

  log('done! use "npx captainhook install" to reinstall');
};

const uninstallRunner = async (ctx: Context): Promise<void> => {
  const p = path.resolve(ctx.hooksDir, path.basename(ctx.assets.runnerFile));
  const runnerStatResult = await stat(p);

  if (!runnerStatResult.ok) {
    return;
  }

  log(`removing ${path.relative(ctx.projectDir, p)}`);
  await unlink(p);
};

const uninstallHook = async (ctx: Context, hook: string): Promise<void> => {
  const p = path.resolve(ctx.hooksDir, hook);
  const result = await readFile(p, { encoding: 'utf8' });

  if (!result.ok) {
    return;
  }

  if (!checkHook(result.value.toString())) {
    log(`NOT removing custom ${hook} hook`);
    return;
  }

  await unlinkHook(ctx, p);
};

const unlinkHook = async (ctx: Context, p: string): Promise<void> => {
  log(`removing ${path.relative(ctx.projectDir, p)}`);
  await unlink(p);
};
