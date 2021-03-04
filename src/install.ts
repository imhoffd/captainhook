import { copyFile, readFile } from 'fs/promises';
import path from 'path';

import { encase } from './util/fn';
import { log } from './util/log';

const ASSETS_DIR = path.resolve(path.dirname(__dirname), 'assets');
const RUNNER_FILE = path.resolve(ASSETS_DIR, 'captainhook.sh');
const ENTRYPOINT_FILE = path.resolve(ASSETS_DIR, 'hook.sh');
const HOOKS_DIR = path.resolve(process.cwd(), '.git', 'hooks');
const HOOKS = [
  'applypatch-msg',
  'pre-applypatch',
  'post-applypatch',
  'pre-commit',
  'prepare-commit-msg',
  'commit-msg',
  'post-commit',
  'pre-rebase',
  'post-checkout',
  'post-merge',
  'post-update',
  'pre-auto-gc',
  'post-rewrite',
  'pre-push',
];

export const run = async (args: string[]): Promise<void> => {
  await installRunner();

  for (const hook of HOOKS) {
    await installHook(hook);
  }

  log('done! use "npx captainhook uninstall" to uninstall');
};

const installRunner = async (): Promise<void> => {
  const p = path.resolve(HOOKS_DIR, 'captainhook.sh');

  log(`writing ${path.relative(process.cwd(), p)}`);
  await copyFile(RUNNER_FILE, p);
};

const installHook = async (hook: string): Promise<void> => {
  const p = path.resolve(HOOKS_DIR, hook);
  const result = await encase(readFile, p, { encoding: 'utf8' });

  if (result.ok && !result.value.includes('captainhook')) {
    log(`NOT overwriting custom ${hook} hook`);
    return;
  }

  log(`writing ${path.relative(process.cwd(), p)}`);
  await copyFile(ENTRYPOINT_FILE, p);
};
