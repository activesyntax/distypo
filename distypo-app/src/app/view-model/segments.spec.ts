import { describe, expect, it } from 'vitest';
import { inlineCorrectionSegments } from '@app/view-model/segments';
import { CorrectionSegment } from '@app/view-model/segments';
import { Correction } from '@core/index';
import { interval } from '@utils/interval';
import { CorrectionId } from '@core/domain/model';
import { Config } from '@config/config';

function makeCorrection(id: string, start: number, end: number): Correction {
  return {
    id: id as CorrectionId,
    range: interval(start, end),
    original: 'original',
    replacement: 'replacement',
    hint: 'hint',
    ruleId: Config.rules[0].id
  };
}

function makeCorrectionSegment(correction: Correction, contextStart: number, contextEnd: number): CorrectionSegment {
  return {
    kind: 'correction',
    correction,
    range: correction.range,
    context: {
      originalRange: interval(contextStart, contextEnd),
      original: 'original',
      replacement: 'replacement',
    },
  };
}

describe('inlineCorrectionSegments', () => {
  it('should return empty array for empty input', () => {
    expect(inlineCorrectionSegments([])).toEqual([]);
  });

  it('should return a single inline segment for a single correction', () => {
    const correction = makeCorrection('c1', 2, 5);
    const segment = makeCorrectionSegment(correction, 0, 7);

    const result = inlineCorrectionSegments([segment]);

    expect(result).toHaveLength(1);
    expect(result[0].kind).toBe('inline-correction');
    expect(result[0].range).toEqual(interval(0, 7));
    expect(result[0].corrections).toEqual([correction]);
  });

  it('should return two separate inline segments for non-overlapping corrections', () => {
    const c1 = makeCorrection('c1', 2, 5);
    const c2 = makeCorrection('c2', 10, 14);
    const s1 = makeCorrectionSegment(c1, 0, 7);
    const s2 = makeCorrectionSegment(c2, 8, 16);

    const result = inlineCorrectionSegments([s1, s2]);

    expect(result).toHaveLength(2);
    expect(result[0].corrections).toEqual([c1]);
    expect(result[1].corrections).toEqual([c2]);
  });

  it('should merge overlapping context ranges into one inline segment', () => {
    const c1 = makeCorrection('c1', 2, 5);
    const c2 = makeCorrection('c2', 4, 8);
    const s1 = makeCorrectionSegment(c1, 0, 6);
    const s2 = makeCorrectionSegment(c2, 3, 10);

    const result = inlineCorrectionSegments([s1, s2]);

    expect(result).toHaveLength(1);
    expect(result[0].range).toEqual(interval(0, 10));
    expect(result[0].corrections).toEqual([c1, c2]);
  });

  it('should merge touching context ranges into one inline segment', () => {
    const c1 = makeCorrection('c1', 0, 3);
    const c2 = makeCorrection('c2', 5, 8);
    const s1 = makeCorrectionSegment(c1, 0, 5);
    const s2 = makeCorrectionSegment(c2, 5, 10);

    const result = inlineCorrectionSegments([s1, s2]);

    expect(result).toHaveLength(1);
    expect(result[0].range).toEqual(interval(0, 10));
    expect(result[0].corrections).toEqual([c1, c2]);
  });

  it('should handle input corrections in unsorted order', () => {
    const c1 = makeCorrection('c1', 10, 14);
    const c2 = makeCorrection('c2', 2, 5);
    const s1 = makeCorrectionSegment(c1, 8, 16);
    const s2 = makeCorrectionSegment(c2, 0, 7);

    const result = inlineCorrectionSegments([s1, s2]);

    expect(result).toHaveLength(2);
    expect(result[0].corrections).toEqual([c2]);
    expect(result[1].corrections).toEqual([c1]);
  });

  it('should merge three mutually overlapping corrections into one segment', () => {
    const c1 = makeCorrection('c1', 0, 5);
    const c2 = makeCorrection('c2', 3, 8);
    const c3 = makeCorrection('c3', 6, 12);
    const s1 = makeCorrectionSegment(c1, 0, 6);
    const s2 = makeCorrectionSegment(c2, 2, 9);
    const s3 = makeCorrectionSegment(c3, 5, 13);

    const result = inlineCorrectionSegments([s1, s2, s3]);

    expect(result).toHaveLength(1);
    expect(result[0].range).toEqual(interval(0, 13));
    expect(result[0].corrections).toEqual([c1, c2, c3]);
  });
});
