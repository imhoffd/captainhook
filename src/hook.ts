import type { Context } from './lib/cli';
import { run as runSubprocess } from './util/cp';
import { findPackageJson, readJson } from './util/fs';

export const run = async (ctx: Context): Promise<void> => {
  const [, hook, ...args] = ctx.args;
  const { hooks } = await readJson<any>(await findPackageJson(ctx.pkgdir));

  if (!hooks) {
    throw new Error('no hooks'); // TODO
  }

  if (!hooks[hook]) {
    return;
  }

  process.exitCode = await runSubprocess(hooks[hook], args, {
    stdio: 'inherit',
    shell: true,
  });
};
