import { run as runSubprocess } from './util/cp';
import { findPackageJson, readJson } from './util/fs';

export const run = async (): Promise<void> => {
  const { hooks } = await readJson<any>(await findPackageJson());
  const [hook, ...args] = process.argv.slice(2);

  if (!hooks) {
    throw new Error('no hooks'); // TODO
  }

  if (!hooks[hook]) {
    throw new Error(`no ${hook} hook`); // TODO
  }

  process.exitCode = await runSubprocess(hooks[hook], args, {
    stdio: 'inherit',
    shell: true,
  });
};
