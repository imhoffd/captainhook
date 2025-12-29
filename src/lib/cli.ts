import path from 'node:path'

import { findGitDir } from '../util/fs'
import { SUPPORTED_HOOKS } from './hooks'

export interface Bootstrap {
  readonly args: readonly string[]
  readonly cwd: string
  readonly pkgDir: string
}

export interface Assets {
  readonly hookFile: string
  readonly runnerFile: string
}

export interface Context extends Bootstrap {
  readonly assetDir: string
  readonly assets: Assets
  readonly projectDir: string
  readonly gitDir: string
  readonly hooksDir: string
  readonly hooks: readonly string[]
}

export const getContext = async (b: Bootstrap): Promise<Context> => {
  const assetDir = path.resolve(b.pkgDir, 'assets')
  const { gitDir, projectDir } = await findGitDir(b.pkgDir)
  const hooksDir = path.resolve(gitDir, 'hooks')

  return {
    ...b,
    assetDir,
    assets: {
      hookFile: path.resolve(assetDir, 'hook.sh'),
      runnerFile: path.resolve(assetDir, 'captainhook.sh'),
    },
    projectDir,
    gitDir,
    hooksDir,
    hooks: SUPPORTED_HOOKS,
  }
}
