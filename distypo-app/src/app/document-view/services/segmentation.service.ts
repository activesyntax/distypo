import { inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { CorrectionSegment, Segment } from '@app/view-model/segments';
import { Correction, LintedDocument } from "@core/index";
import { complement, interval, Interval } from '@core/utils';



@Injectable()
export class SegmentationService {

  private correctionService: CorrectionService = inject(CorrectionService);

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

  asText(segments: Segment[]): string {

    const text = segments.reduce((acc: string, seg: Segment) => {
      switch (seg.kind) {
        case 'text': return acc + seg.text;
        case 'correction': return acc + this.asDisplayText(seg);
      }
    }, '');

    return text;
  }

  asDisplayText(segment: CorrectionSegment): string {

    const status = this.correctionService.statusOf(segment.correction.id)
    const ctx = segment.context;
    switch (status.kind) {
      case 'pending':
      case 'kept':
        return ctx.original;
      case 'fixed':
        return status.customReplacement ?? ctx.replacement;
      default: return ''
    }
  }
}

function toCorrectionSegment(correction: Correction, content: string): CorrectionSegment {

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

const toTextSegment = (range: Interval, text: string): Segment => ({
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


function contextRange(content: string, correction: Correction): Interval {
  const spaceBefore = findWhitespaceBefore(content, correction.range.start);
  const spaceAfter = findWhitespaceAfter(content, correction.range.end);

  const start = spaceBefore !== undefined ? spaceBefore + 1 : 0;
  const end = spaceAfter ?? content.length;

  return interval(start, end);
}
