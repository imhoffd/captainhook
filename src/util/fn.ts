export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export const tryfn = async <T>(fn: () => Promise<T>): Promise<Result<T>> => {
  try {
    return { ok: true, value: await fn() };
  } catch (e) {
    return { ok: false, error: e };
  }
};

export const isOK = async (fn: () => Promise<unknown>): Promise<boolean> =>
  (await tryfn(fn)).ok;
