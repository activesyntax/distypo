import { pairwise } from "@utils/array";

export type Interval = { start: number, end: number }
export function interval(start: number, end: number): Interval {
  if (end < start) throw new Error(`Invalid interval: end (${end}) < start (${start})`);
  return { start, end };
}

/** Assumes intervals are sorted (interval1.start <= interval2.start) */
export function isOverlapSorted(interval1: Interval, interval2: Interval) {

  return interval1.start <= interval2.end && interval1.end >= interval2.start;
}

export function intervalCompare(a: Interval, b: Interval): number {

  return a.start - b.start;
}

export function intersection(interval1: Interval, interval2: Interval): Interval | undefined {
  const start = Math.max(interval1.start, interval2.start);
  const end = Math.min(interval1.end, interval2.end);
  return start <= end ? interval(start, end) : undefined;
}


function unionOperation(interval1: Interval, interval2: Interval): Interval[] {

  return isOverlapSorted(interval1, interval2)
    ? [interval(Math.min(interval1.start, interval2.start), Math.max(interval1.end, interval2.end))]
    : [interval1, interval2];
}


export function union(...intervals: readonly Interval[]): Interval[] {

  if (intervals.length === 0) return [];

  const sortedIntervals = intervals.toSorted(intervalCompare);

  const result: Interval[] = [sortedIntervals[0]];

  for (let i = 1; i < sortedIntervals.length; i++) {
    const last = result[result.length - 1];
    const merged = unionOperation(last, sortedIntervals[i]);
    result[result.length - 1] = merged[0];
    if (merged.length === 2) result.push(merged[1]);
  }
  return result;
}

export function complement(intervals: readonly Interval[], within: Interval): Interval[] {

  if (intervals.length === 0) return [{ start: within.start, end: within.end }];

  const unionOfIntervals = union(...intervals);


  const gaps = Array.from(pairwise(unionOfIntervals), ([prev, next]): Interval => interval(Math.max(prev.end, within.start), Math.min(next.start, within.end)));


  if (unionOfIntervals.length === 0) {
    return [{ start: within.start, end: within.end }];
  }
  const firstInterval = unionOfIntervals[0];
  if (firstInterval.start > within.start) {
    gaps.unshift(interval(within.start, firstInterval.start));
  }

  const lastInterval = unionOfIntervals[unionOfIntervals.length - 1];
  if (lastInterval.end < within.end) {
    gaps.push(interval(lastInterval.end, within.end));
  }

  return gaps;
}
