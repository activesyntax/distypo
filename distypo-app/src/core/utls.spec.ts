import { describe, it, expect } from 'vitest';
import { pairwise, union, complement, interval } from '@core/utils';

describe('pairwise', () => {

  it('generates pairs from an array', () => {
    const input = [1, 2, 3, 4];
    const expected = [[1, 2], [2, 3], [3, 4]];
    const result = Array.from(pairwise(input));
    expect(result).toEqual(expected);
  });

  it('returns an empty array for an empty input', () => {
    const input: number[] = [];
    const result = Array.from(pairwise(input));
    expect(result).toEqual([]);
  });

  it('returns an empty array for a single-element input', () => {
    const input = [42];
    const result = Array.from(pairwise(input));
    expect(result).toEqual([]);
  });

  it('works with non-numeric types', () => {
    const input = ['a', 'b', 'c'];
    const expected = [['a', 'b'], ['b', 'c']];
    const result = Array.from(pairwise(input));
    expect(result).toEqual(expected);
  });

});


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

});
