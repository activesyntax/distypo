export type UniqId<T extends string> = string & { readonly __brand: T };

export function createGuid<T extends string>(_brand: T): UniqId<T> {
  return crypto.randomUUID() as UniqId<T>;
}

export function* pairwise<T>(xs: readonly T[]): Generator<readonly [T, T]> {
  for (let i = 1; i < xs.length; i++) yield [xs[i - 1], xs[i]];
}

export type Interval = [number, number];

export function union(interval1: Interval, interval2: Interval): Interval[] {

  const isOverlap = interval1[0] <= interval2[1] && interval1[1] >= interval2[0];

  return isOverlap
    ? [[Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])]]
    : [interval1, interval2];
}

export function multiUnion(intervals: readonly Interval[]): Interval[] {

  let mergedIntervals: Interval[] = [];

  for (const interval of intervals) {

    console.log("Interval", interval);

    console.log("Merged intervals", mergedIntervals);
    if (mergedIntervals.length === 0) {
      console.log("Pushing interval", interval);
      mergedIntervals.push(interval);
    }
    else {

      const lastInterval: Interval = mergedIntervals.pop() ?? [0, 0];

      console.log("Last interval", lastInterval);

      const merged: Interval[] = union(lastInterval, interval);

      console.log("Merged", merged);

      mergedIntervals = mergedIntervals.concat(merged);

      console.log("Merged intervals", mergedIntervals);
    }

    console.log("Merged intervals", mergedIntervals);
    console.log("-----------------------------------------")
  }
  return mergedIntervals;
}

