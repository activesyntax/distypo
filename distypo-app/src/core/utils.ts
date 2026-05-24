export type UniqId<T extends string> = string & { readonly __brand: T };

export function createGuid<T extends string>(_brand: T): UniqId<T> {
  return crypto.randomUUID() as UniqId<T>;
}

export function* pairwise<T>(xs: readonly T[]): Generator<readonly [T, T]> {
  for (let i = 1; i < xs.length; i++) yield [xs[i - 1], xs[i]];
}
