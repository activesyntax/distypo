export type UniqId<T extends string> = Readonly<string & { readonly __brand: T }>;

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

