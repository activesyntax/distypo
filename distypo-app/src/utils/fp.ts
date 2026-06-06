export function mapDefined<A, B>(value: A | undefined, f: (a: A) => B): B | undefined {
  return value !== undefined ? f(value) : undefined;
}
