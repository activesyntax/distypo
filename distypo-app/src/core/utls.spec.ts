import { describe, it, expect } from 'vitest';
import { sum } from '@core/utils';

describe('sum', () => {
  it('adds two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('handles negatives', () => {
    expect(sum(-1, -4)).toBe(-5);
  });

  it('returns 0 + 0 as 0', () => {
    expect(sum(0, 0)).toBe(0);
  });
});
