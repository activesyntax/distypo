import { describe, it, expect } from 'vitest';
import { pairwise, union, multiUnion, Interval } from '@core/utils';

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
    const interval1: Interval = [1, 3];
    const interval2: Interval = [2, 4];
    const expected = [[1, 4]];
    const result = union(interval1, interval2);
    expect(result).toEqual(expected);
  });


  it('returns the union of two non-overlapping intervals', () => {
    const interval1: Interval = [1, 3];
    const interval2: Interval = [4, 6];
    const expected = [[1, 3], [4, 6]];
    const result = union(interval1, interval2);
    expect(result).toEqual(expected);
  });

});


describe('multiUnion', () => {

  it('returns the union of tree continuous intervals', () => {
    const interval1: Interval = [1, 3];
    const interval2: Interval = [3, 4];
    const interval3: Interval = [4, 6];
    const expected = [[1, 6]];
    const result = multiUnion(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });


  it('returns the union of tree non-overlapping intervals', () => {
    const interval1: Interval = [1, 3];
    const interval2: Interval = [4, 6];
    const interval3: Interval = [7, 9];
    const expected = [[1, 3], [4, 6], [7, 9]];
    const result = multiUnion(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of tree overlapping intervals', () => {
    const interval1: Interval = [1, 3];
    const interval2: Interval = [2, 4];
    const interval3: Interval = [3, 5];
    const expected = [[1, 5]];
    const result = multiUnion(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });


  it('returns the union of two overlapping intervals and one non-overlapping interval', () => {
    const interval1: Interval = [1, 3];
    const interval2: Interval = [2, 4];
    const interval3: Interval = [10, 12];
    const expected = [[1, 4], [10, 12]];
    const result = multiUnion(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of  and one non-overlapping interval and two overlapping intervals', () => {
    const interval1: Interval = [1, 3];
    const interval2: Interval = [10, 12];
    const interval3: Interval = [11, 14];
    const expected = [[1, 3], [10, 14]];
    const result = multiUnion(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

  it('returns the union of unsorted intervals', () => {
    const interval1: Interval = [0, 10];
    const interval2: Interval = [10, 20];
    const interval3: Interval = [5, 25];
    const expected = [[0, 25]];
    const result = multiUnion(interval1, interval2, interval3);
    expect(result).toEqual(expected);
  });

});
