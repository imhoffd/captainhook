import { constants } from 'fs';
import { access, readFile } from 'fs/promises';
import path from 'path';

import { encaseOK } from '../fn';

export const readJson = async <T = unknown>(p: string): Promise<T> =>
  JSON.parse(await readFile(p, { encoding: 'utf8' }));

export const accessOK = async (
  p: string,
  mode = constants.F_OK,
): Promise<boolean> => encaseOK(access)(p, mode);

export const findGitDir = async (dir: string): Promise<string> =>
  _findUp(dir, '.git');

const _findUp = async (
  dir: string,
  file: string,
  collectedDirs: string[] = [],
): Promise<string> => {
  const { root } = path.parse(dir);

  if (dir === root) {
    throw new Error(
      `${file} not found in the following directories:\n` +
        `${[...collectedDirs, root].map(d => ` - ${d}`).join('\n')}`,
    );
  }

  const p = path.join(dir, file);

  if (await accessOK(p)) {
    return p;
  }

  return _findUp(path.dirname(dir), file, [...collectedDirs, dir]);
};
