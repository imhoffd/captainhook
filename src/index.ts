import { log } from './util/log';

export const run = async (): Promise<void> => {
  const [cmd, ...args] = process.argv.slice(2);

  switch (cmd) {
    case 'run': {
      const { run: runHook } = await import('./hook');
      return runHook(args);
    }
    case 'install': {
      const { run: runInstall } = await import('./install');
      return runInstall(args);
    }
    case 'uninstall': {
      break; // TODO
    }
  }

  log(`unknown command "${cmd}"`);
  process.exitCode = 1;
};
