export const SUPPORTED_HOOKS = [
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
] as const;

export const checkHook = (contents: string): boolean => {
  const header = contents.split('\n')[1];
  return header.includes('captainhook file');
};
