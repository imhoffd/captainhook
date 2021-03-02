import { run as runSubprocess } from './util/cp';
import { findPackageJson, readJson } from './util/fs';

export const run = async ([hook, ...args]: string[]): Promise<void> => {
  const { hooks } = await readJson<any>(await findPackageJson());

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
