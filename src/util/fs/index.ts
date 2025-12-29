import { constants } from 'node:fs'
import { access, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

import { encaseOK } from '../fn'

export const readJson = async <T = unknown>(p: string): Promise<T> =>
  JSON.parse(await readFile(p, { encoding: 'utf8' })) as T

export const accessOK = async (
  p: string,
  mode = constants.F_OK,
): Promise<boolean> => encaseOK(access)(p, mode)

export const findGitDir = async (dir: string): Promise<string> => {
  const gitPath = await _findUp(dir, '.git')

  const stats = await stat(gitPath)

  let resolvedGitDir: string

  if (stats.isFile()) {
    const content = await readFile(gitPath, { encoding: 'utf8' })
    const match = content.match(/^gitdir:\s*(.+)$/m)

    if (!match) {
      throw new Error(
        `Invalid .git file at ${gitPath}: expected "gitdir: <path>" format`,
      )
    }

    const gitdirPath = match[1].trim()

    resolvedGitDir = path.isAbsolute(gitdirPath)
      ? gitdirPath
      : path.resolve(path.dirname(gitPath), gitdirPath)
  } else {
    resolvedGitDir = gitPath
  }

  const commondirPath = path.join(resolvedGitDir, 'commondir')

  if (await accessOK(commondirPath)) {
    const commondirContent = await readFile(commondirPath, { encoding: 'utf8' })
    const commondir = commondirContent.trim()

    return path.resolve(resolvedGitDir, commondir)
  }

  return resolvedGitDir
}

const _findUp = async (
  dir: string,
  file: string,
  collectedDirs: string[] = [],
): Promise<string> => {
  const { root } = path.parse(dir)

  if (dir === root) {
    throw new Error(
      `${file} not found in the following directories:\n` +
        [...collectedDirs, root].map((d) => ` - ${d}`).join('\n'),
    )
  }

  const p = path.join(dir, file)

  if (await accessOK(p)) {
    return p
  }

  return _findUp(path.dirname(dir), file, [...collectedDirs, dir])
}
