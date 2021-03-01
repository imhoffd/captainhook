import * as cp from 'child_process';

export const run = (
  cmd: string,
  args: string[],
  options: cp.SpawnOptions,
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const p = cp.spawn(cmd, args, options);

    p.on('error', reject);
    p.on('close', (code, signal) => {
      if (code === null) {
        reject(`${signal} signal interrupt`);
      } else {
        resolve(code);
      }
    });
  });
};
