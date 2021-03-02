import { constants } from 'fs';
import { access, readFile } from 'fs/promises';
import * as path from 'path';

import { isOK } from './fn';

export const readJson = async <T = unknown>(p: string): Promise<T> =>
  JSON.parse(await readFile(p, { encoding: 'utf8' }));

export const accessOK = async (
  p: string,
  mode = constants.R_OK,
): Promise<boolean> => isOK(access, p, mode);

export const findPackageJson = async (dir = process.cwd()): Promise<string> =>
  _findUp(dir, 'package.json');

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
