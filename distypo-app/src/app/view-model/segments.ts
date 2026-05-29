import { Correction, LintedDocument } from "@core/index";
import { complement, interval, Interval } from "@core/utils";

export type TextSegment = { kind: 'text'; text: string; range: Interval };
export type CorrectionSegment = {
  kind: 'correction';
  correction: Correction;
  range: Interval;
  context: {
    originalRange: Interval;
    original: string;
    replacement: string;
  }
};

export type Segment = TextSegment | CorrectionSegment;

export function toCorrectionSegment(correction: Correction, content: string): CorrectionSegment {

  const originalContextRange = contextRange(content, correction);
  const replacementText =
    content.slice(originalContextRange.start, correction.range.start)
    + correction.replacement
    + content.slice(correction.range.end, originalContextRange.end);

  return {
    kind: 'correction',
    correction,
    range: correction.range,
    context: {
      originalRange: originalContextRange,
      original: content.slice(originalContextRange.start, originalContextRange.end),
      replacement: replacementText,
    },
  }
}

export const toTextSegment = (range: Interval, text: string): Segment => ({
  kind: 'text',
  text: text,
  range,
});

const isWhitespace = (ch: string): boolean => /[\s\u00A0]/.test(ch);

const findWhitespaceBefore = (content: string, end: number): number | undefined => {
  const idx = [...content.slice(0, end)].findLastIndex(isWhitespace);
  return idx === -1 ? undefined : idx;
};

const findWhitespaceAfter = (content: string, start: number): number | undefined => {
  const idx = [...content.slice(start)].findIndex(isWhitespace);
  return idx === -1 ? undefined : idx + start;
};


export function contextRange(content: string, correction: Correction): Interval {
  const spaceBefore = findWhitespaceBefore(content, correction.range.start);
  const spaceAfter = findWhitespaceAfter(content, correction.range.end);

  const start = spaceBefore !== undefined ? spaceBefore + 1 : 0;
  const end = spaceAfter ?? content.length;

  return interval(start, end);
}

export function split(document: LintedDocument): Segment[] {
  const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

  const gaps = complement(
    correctionSegments.map(c => c.context.originalRange),
    interval(0, document.content.length)
  );

  const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

  const allSegments = [...correctionSegments, ...textSegments].toSorted((a, b) => a.range.start - b.range.start);

  return allSegments;
}

