import { CorrectionStatus } from "@app/state/correction-status";
import { Correction, LintedDocument } from "@core/index";
import { complement, intersection, interval, Interval, intervalCompare, union } from "@utils/interval";

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
export type InlineCorrectionSegment = {
  kind: 'inline-correction';
  corrections: Correction[];
  range: Interval;
}

export type Segment = TextSegment | CorrectionSegment | InlineCorrectionSegment;

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
  // const end = spaceAfter !== undefined ? spaceAfter + 1 : content.length;

  return interval(start, end);
}

export function toSegments(document: LintedDocument): Segment[] {
  const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

  const inlineSegments = inlineCorrectionSegments(correctionSegments);

  const gaps = complement(
    correctionSegments.map(c => c.context.originalRange),
    interval(0, document.content.length)
  );

  const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

  const allSegments = [...correctionSegments, ...inlineSegments, ...textSegments].toSorted((a, b) => intervalCompare(a.range, b.range));

  console.log('SEGMENTS');
  console.log(allSegments);
  return allSegments;
}


export function inlineCorrectionSegments(correctionSegments: CorrectionSegment[]): InlineCorrectionSegment[] {

  const sortedCorrectionSegments = correctionSegments.toSorted((a, b) => intervalCompare(a.context.originalRange, b.context.originalRange));

  const unionOfIntervals = union(...sortedCorrectionSegments.map(c => c.context.originalRange));

  const correctionMap = unionOfIntervals.map(i => ({ interval: i, segments: intersectiingSegments(i, sortedCorrectionSegments) }));

  const inlineSegments: InlineCorrectionSegment[] = correctionMap.map(m => ({
    kind: 'inline-correction',
    range: m.interval,
    corrections: m.segments.map(s => s.correction),
  }));

  return inlineSegments;
}

function intersectiingSegments(interval: Interval, segments: CorrectionSegment[]): CorrectionSegment[] {
  return segments.filter(s => intersection(s.context.originalRange, interval) !== undefined);
}

// export function resolveCorrectionSegment(segment: InlineCorrectionSegment, status: CorrectionStatus): string {
export function resolveCorrectionSegment(segment: InlineCorrectionSegment): string {

  // TODO: this is a temporary solution to display the correction status in the
  // inline correction view. We should eventually display the actual correction
  // text here, but for now we just want to see that the status is correctly
  // resolved.
  return `(${segment.corrections.map(c => c.original).join(', ')})`;

  // const ctx = segment.corrections[0].context;
  // switch (status.kind) {
  //   case 'pending':
  //   case 'kept':
  //     return ctx.original;
  //   case 'fixed':
  //     return status.customReplacement ?? ctx.replacement;
  //   default: return ''
  // }
}

