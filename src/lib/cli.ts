import path from 'path';

export interface Bootstrap {
  readonly args: readonly string[];
  readonly cwd: string;
  readonly pkgdir: string;
}

export interface Assets {
  readonly hookFile: string;
  readonly runnerFile: string;
}

export interface Context extends Bootstrap {
  readonly assetDir: string;
  readonly assets: Assets;
  readonly hooksDir: string;
  readonly hooks: readonly string[];
}

export const getContext = async (b: Bootstrap): Promise<Context> => {
  const assetDir = path.resolve(b.pkgdir, 'assets');
  const hooksDir = path.resolve(b.cwd, '.git', 'hooks');

  return {
    ...b,
    assetDir,
    assets: {
      hookFile: path.resolve(assetDir, 'hook.sh'),
      runnerFile: path.resolve(assetDir, 'captainhook.sh'),
    },
    hooksDir,
    hooks: [
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
    ],
  };
};