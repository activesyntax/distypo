export type UniqId<T extends string> = string & { readonly __brand: T };

export function createGuid<T extends string>(_brand: T): UniqId<T> {
  return crypto.randomUUID() as UniqId<T>;
}

export function* pairwise<T>(xs: readonly T[]): Generator<readonly [T, T]> {
  for (let i = 1; i < xs.length; i++) yield [xs[i - 1], xs[i]];
}

export type Interval = { start: number, end: number }
export function interval(start: number, end: number): Interval {
  if (end < start) throw new Error(`Invalid interval: end (${end}) < start (${start})`);
  return { start, end };
}


function unionOperation(interval1: Interval, interval2: Interval): Interval[] {

  const isOverlap = interval1.start <= interval2.end && interval1.end >= interval2.start;

  return isOverlap
    ? [{
      start: Math.min(interval1.start, interval2.start),
      end: Math.max(interval1.end, interval2.end),
    }]
    : [interval1, interval2];
}

export function union(...intervals: readonly Interval[]): Interval[] {

  let intervalUnion: Interval[] = [];

  const sortedIntervals = intervals.toSorted((a, b) => a.start - b.start);

  for (const interval of sortedIntervals) {

    if (intervalUnion.length === 0) {
      intervalUnion.push(interval);
    }
    else {

      const lastInterval = intervalUnion.pop();

      let merged: Interval[] = [];
      if (lastInterval) {
        merged = unionOperation(lastInterval, interval);
      }


      intervalUnion = intervalUnion.concat(merged);
    }
  }
  return intervalUnion;
}

export function complement(intervals: readonly Interval[], within: Interval): Interval[] {


  if (intervals.length === 0) return [{ start: within.start, end: within.end }];

  const unionOfIntervals = union(...intervals);

  const gaps = Array.from(pairwise(unionOfIntervals), ([prev, next]): Interval => ({
    start: prev.end,
    end: next.start,
  }));

  if (unionOfIntervals.length === 0) {
    return [{ start: within.start, end: within.end }];
  }
  const firstInterval = unionOfIntervals[0];
  if (firstInterval.start > within.start) {
    gaps.unshift({ start: within.start, end: firstInterval.start });
  }

  const lastInterval = unionOfIntervals[unionOfIntervals.length - 1];
  if (lastInterval.end < within.end) {
    gaps.push({ start: lastInterval.end, end: within.end });
  }

  return gaps;
}
