import type { Bootstrap } from './lib/cli';
import { getContext } from './lib/cli';
import { log } from './util/log';

export const run = async (b: Bootstrap): Promise<void> => {
  const ctx = await getContext(b);
  const [cmd] = ctx.args;

  switch (cmd) {
    case 'run': {
      const { run: runHook } = await import('./hook');
      return runHook(ctx);
    }
    case 'install': {
      const { run: runInstall } = await import('./install');
      return runInstall(ctx);
    }
    case 'uninstall': {
      const { run: runUninstall } = await import('./uninstall');
      return runUninstall(ctx);
    }
  }

  log(`unknown command "${cmd}"`);
  process.exitCode = 1;
};
