export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: unknown };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const err = (error: unknown): Result<never> => ({ ok: false, error });

export const map = <A, B>(r: Result<A>, fn: (a: A) => B): Result<B> =>
  r.ok ? ok(fn(r.value)) : r;

export const mapError = <A>(r: Result<A>, fn: (e: unknown) => unknown): Result<A> =>
  r.ok ? r : err(fn(r.error));
