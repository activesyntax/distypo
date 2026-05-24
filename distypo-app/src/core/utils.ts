export type UniqId<T extends string> = string & { readonly __brand: T };

export function createGuid<T extends string>(_brand: T): UniqId<T> {
  return crypto.randomUUID() as UniqId<T>;
}


export const pairwise = <T>(arr: readonly T[]): [T, T][] => {
  const result: [T, T][] = [];
  const pairs = [0, arr.length - 2].map(i => [i, i + 1]);


  for (let i = 0; i < arr.length - 1; i++) {
    result.push([arr[i], arr[i + 1]]);

  }
  return result;
}
