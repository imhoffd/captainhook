export const log = (msg: string): boolean =>
  process.stdout.write(`[captainhook]: ${msg}\n`);
