export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const ok = <T, E = Error>(value: T): Result<T, E> => ({
  ok: true,
  value,
});

export const err = <T, E = Error>(error: E): Result<T, E> => ({
  ok: false,
  error,
});

export const encase = async <T, A extends any[]>(
  fn: (...args: A) => Promise<T>,
  ...args: A
): Promise<Result<T>> => {
  try {
    return ok(await fn(...args));
  } catch (e) {
    return err(e);
  }
};

export const isOK = async <A extends any[]>(
  fn: (...args: A) => Promise<unknown>,
  ...args: A
): Promise<boolean> => (await encase(fn, ...args)).ok;
