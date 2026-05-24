import { describe, it, expect } from 'vitest';
import { pairwise } from '@core/utils';

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
