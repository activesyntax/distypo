export type UniqId<T extends string> = string & { readonly __brand: T };

export function createGuid<T extends string>(_brand: T): UniqId<T> {
  return crypto.randomUUID() as UniqId<T>;
}

export function uniqId<T extends string>(guid: string, brand: T): UniqId<T> {
  return guid as UniqId<T>;
}
