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

export function multiUnion(...intervals: readonly Interval[]): Interval[] {

  let intervalUnion: Interval[] = [];

  const sortedIntervals = intervals.toSorted((a, b) => a[0] - b[0]);

  for (const interval of sortedIntervals) {

    if (intervalUnion.length === 0) {
      intervalUnion.push(interval);
    }
    else {

      const lastInterval: Interval = intervalUnion.pop() ?? [0, 0];
      const merged: Interval[] = union(lastInterval, interval);

      intervalUnion = intervalUnion.concat(merged);
    }
  }
  return intervalUnion;
}

export function complement(intervals: readonly Interval[], within: Interval): Interval[] {

  const axisEnd = within[1];

  if (intervals.length === 0) return [[0, axisEnd]];

  const merge = multiUnion(...intervals);
  const gaps = [...pairwise(merge)].map((ipair) => [ipair[0][1], ipair[1][0]] as Interval);

  const lastInterval = merge[merge.length - 1];
  if (lastInterval[1] < axisEnd) {
    gaps.push([lastInterval[1], axisEnd]);
  }
  return gaps;
}
