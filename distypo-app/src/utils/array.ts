export function* pairwise<T>(xs: readonly T[]): Generator<readonly [T, T]> {
  for (let i = 1; i < xs.length; i++) yield [xs[i - 1], xs[i]];
}
