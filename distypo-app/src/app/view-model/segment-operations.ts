import { Correction, LintedDocument } from "@core/index";
import { complement, intersection, interval, Interval, intervalCompare, union } from "@utils/interval";

import { createGuid } from "@utils/identity";
import { contextRange } from "@app/view-model/context";
import { CorrectionSegment, Segment, InlineCorrectionSegment } from "./segment";


export function toCorrectionSegment(correction: Correction, content: string): CorrectionSegment {

  const originalContextRange = contextRange(content, correction);
  const replacementText =
    content.slice(originalContextRange.start, correction.range.start)
    + correction.replacement
    + content.slice(correction.range.end, originalContextRange.end);

  return {
    id: createGuid("SegmentId"),
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

  id: createGuid("SegmentId"),
  kind: 'text',
  text: text,
  range,
});

export function toSegments(document: LintedDocument): Segment[] {
  const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

  const inlineSegments = inlineCorrectionSegments(correctionSegments);

  const gaps = complement(
    correctionSegments.map(c => c.context.originalRange),
    interval(0, document.content.length)
  );

  const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

  const kindPriority = (kind: Segment['kind']): number =>
    kind === 'inline-correction' ? 0 : 1;

  const allSegments = [...correctionSegments, ...inlineSegments, ...textSegments]
    .toSorted((a, b) =>
      intervalCompare(a.range, b.range) ||
      kindPriority(a.kind) - kindPriority(b.kind)
    );

  console.log('SEGMENTS');
  console.log(allSegments);
  return allSegments;
}


export function inlineCorrectionSegments(correctionSegments: CorrectionSegment[]): InlineCorrectionSegment[] {

  const sortedCorrectionSegments = correctionSegments.toSorted((a, b) => intervalCompare(a.context.originalRange, b.context.originalRange));

  const unionOfIntervals = union(...sortedCorrectionSegments.map(c => c.context.originalRange));

  const correctionMap = unionOfIntervals.map(i => ({ interval: i, segments: intersectiingSegments(i, sortedCorrectionSegments) }));

  const inlineSegments: InlineCorrectionSegment[] = correctionMap.map(m => ({
    id: createGuid("SegmentId"),
    kind: 'inline-correction',
    range: m.interval,
    corrections: m.segments.map(s => s.correction),
  }));

  return inlineSegments;
}

function intersectiingSegments(interval: Interval, segments: CorrectionSegment[]): CorrectionSegment[] {
  return segments.filter(s => intersection(s.context.originalRange, interval) !== undefined);
}

