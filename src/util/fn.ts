export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export const tryfn = async <T, A extends any[]>(
  fn: (...args: A) => Promise<T>,
  ...args: A
): Promise<Result<T>> => {
  try {
    return { ok: true, value: await fn(...args) };
  } catch (e) {
    return { ok: false, error: e };
  }
};

export const isOK = async <A extends any[]>(
  fn: (...args: A) => Promise<unknown>,
  ...args: A
): Promise<boolean> => (await tryfn(fn, ...args)).ok;
