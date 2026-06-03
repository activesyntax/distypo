
import { describe, it, expect } from 'vitest';
import { union, complement, interval, Interval, intersection } from '@utils/interval';

describe('union', () => {

  it('returns the union of two overlapping intervals', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(2, 4);
    const expected = [interval(1, 4)];
    const result = union(interval1, interval2);
    expect(result).toEqual(expected);
  });

  it('returns the union of two non-overlapping intervals', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(4, 6);
    const expected = [interval(1, 3), interval(4, 6)];
    const result = union(interval1, interval2);
    expect(result).toEqual(expected);
  });

});

describe('multiUnion', () => {

  it('returns the union of three continuous intervals', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(3, 4);
    const interval3 = interval(4, 6);
    const expected = [interval(1, 6)];
    const result = union(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of three non-overlapping intervals', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(4, 6);
    const interval3 = interval(7, 9);
    const expected = [interval(1, 3), interval(4, 6), interval(7, 9)];
    const result = union(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of three overlapping intervals', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(2, 4);
    const interval3 = interval(3, 5);
    const expected = [interval(1, 5)];
    const result = union(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of two overlapping intervals and one non-overlapping interval', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(2, 4);
    const interval3 = interval(10, 12);
    const expected = [interval(1, 4), interval(10, 12)];
    const result = union(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of one non-overlapping interval and two overlapping intervals', () => {
    const interval1 = interval(1, 3);
    const interval2 = interval(10, 12);
    const interval3 = interval(11, 14);
    const expected = [interval(1, 3), interval(10, 14)];
    const result = union(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of unsorted intervals', () => {
    const interval1 = interval(0, 10);
    const interval2 = interval(10, 20);
    const interval3 = interval(5, 25);
    const expected = [interval(0, 25)];
    const result = union(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

});

describe('complement', () => {

  it('returns the complement of two intervals', () => {
    const intervals = [interval(1, 3), interval(5, 6)];
    const within = interval(0, 10);
    const expected = [interval(0, 1), interval(3, 5), interval(6, 10)];
    const result = complement(intervals, within);
    expect(result).toEqual(expected);
  });

  it('returns the complement of no intervals', () => {
    const intervals: Interval[] = [];
    const within = interval(2, 10);
    const expected = [interval(2, 10)];
    const result = complement(intervals, within);
    expect(result).toEqual(expected);
  });

  it('returns the complement of intervals that cover the entire range', () => {
    const intervals = [interval(0, 5), interval(5, 10)];
    const within = interval(0, 10);
    const expected: Interval[] = [];
    const result = complement(intervals, within);
    expect(result).toEqual(expected);
  });

  it('returns the complement of intervals that partially cover the range', () => {
    const intervals = [interval(1, 3), interval(5, 7)];
    const within = interval(0, 10);
    const expected = [interval(0, 1), interval(3, 5), interval(7, 10)];
    const result = complement(intervals, within);
    expect(result).toEqual(expected);
  });

  it('returns the complement of intervals that are outside the range', () => {
    const intervals = [interval(-5, -1), interval(11, 15)];
    const within = interval(0, 10);
    const expected = [interval(0, 10)];
    const result = complement(intervals, within);
    expect(result).toEqual(expected);
  });

  it('return the complement of intervals that partially are outside the range', () => {
    const intervals = [interval(-5, 2), interval(8, 15)];
    const within = interval(0, 10);
    const expected = [interval(2, 8)];
    const result = complement(intervals, within);
    expect(result).toEqual(expected);
  });

});


describe('intersection', () => {
  it('should return the overlapping region when intervals partially overlap', () => {
    expect(intersection(interval(0, 10), interval(5, 15))).toEqual(interval(5, 10));
  });

  it('should return the inner interval when one contains the other', () => {
    expect(intersection(interval(0, 20), interval(5, 10))).toEqual(interval(5, 10));
  });

  it('should return a single-point interval when intervals share only an endpoint', () => {
    expect(intersection(interval(0, 5), interval(5, 10))).toEqual(interval(5, 5));
  });

  it('should return undefined when intervals do not overlap', () => {
    expect(intersection(interval(0, 5), interval(6, 10))).toBeUndefined();
  });

  it('should return the interval itself when both intervals are identical', () => {
    expect(intersection(interval(3, 7), interval(3, 7))).toEqual(interval(3, 7));
  });
});
