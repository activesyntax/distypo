import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { complement, interval, Interval } from '@core/utils';


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


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {
    const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

    const gaps = complement(
      correctionSegments.map(c => c.context.originalRange),
      interval(0, document.content.length)
    );

    console.log("gaps", gaps);

    const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

    const allSegments = [...correctionSegments, ...textSegments].toSorted((a, b) => a.range.start - b.range.start);

    console.log("allSegments", allSegments);
    return allSegments;

  }
}

function toCorrectionSegment(correction: Correction, content: string): CorrectionSegment {

  const originalContextRange = contextRange(content, correction);
  const replacementText = content.slice(originalContextRange.start, correction.range.start) + correction.replacement + content.slice(correction.range.end, originalContextRange.end);

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

const toTextSegment = (range: Interval, text: string): Segment => ({
  kind: 'text',
  text: text,
  range,
});

function findWhitespaceBefore(content: string, end: number): number | undefined {
  for (let i = end - 1; i >= 0; i--) {
    if (/[\s\u00A0]/.test(content[i])) return i;
  }
  return undefined;
}

function findWhitespaceAfter(content: string, start: number): number | undefined {
  for (let i = start; i < content.length; i++) {
    if (/[\s\u00A0]/.test(content[i])) return i;
  }
  return undefined;
}


function contextRange(content: string, correction: Correction): Interval {
  const spaceBefore = findWhitespaceBefore(content, correction.range.start);
  const spaceAfter = findWhitespaceAfter(content, correction.range.end);

  const start = spaceBefore !== undefined ? spaceBefore + 1 : 0;
  const end = spaceAfter ?? content.length;

  return interval(start, end);
}
