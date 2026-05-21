export type UniqId<T extends string> = Readonly<string & { readonly __brand: T }>;

