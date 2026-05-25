import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { complement, Interval } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string, range: Interval }
  | { kind: 'correction'; correction: Correction, range: Interval };


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {
    const correctionSegments: Segment[] = document.corrections.map(c => ({
      kind: 'correction',
      correction: c,
      range: c.range,
    }));

    const gaps = complement(
      document.corrections.map(c => c.range),
      { start: 0, end: document.content.length },
    );

    const textSegments: Segment[] = gaps.map(range => ({
      kind: 'text',
      text: document.content.slice(range.start, range.end),
      range,
    }));

    return [...correctionSegments, ...textSegments].toSorted(
      (a, b) => a.range.start - b.range.start
    );
  }
}
