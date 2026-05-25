import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { complement, interval, Interval } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string, range: Interval }
  | { kind: 'correction'; correction: Correction, range: Interval };


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {
    const correctionSegments: Segment[] = document.corrections.map(toCorrectionSegment);

    const gaps = complement(
      document.corrections.map(c => c.range),
      interval(0, document.content.length)
    );

    const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

    return [...correctionSegments, ...textSegments].toSorted(
      (a, b) => a.range.start - b.range.start
    );
  }
}

const toCorrectionSegment = (c: Correction): Segment => ({
  kind: 'correction',
  correction: c,
  range: c.range,
});

const toTextSegment = (range: Interval, text: string): Segment => ({
  kind: 'text',
  text: text,
  range,
});
