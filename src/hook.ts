import path from 'node:path'

import type { Context } from './lib/cli'

import { run as runSubprocess } from './util/cp'
import { readJson } from './util/fs'

export const run = async (ctx: Context): Promise<void> => {
  const [, hook, ...args] = ctx.args
  const { hooks } = await readJson<{
    hooks: Record<string, string | undefined>
  }>(path.resolve(ctx.projectDir, 'package.json'))

  if (!hooks) {
    throw new Error('no hooks') // TODO
  }

  if (!hooks[hook]) {
    return
  }

  process.exitCode = await runSubprocess(hooks[hook], args, {
    stdio: 'inherit',
    shell: true,
  })
}
