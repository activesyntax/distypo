import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { complement, Interval } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string, range: Interval }
  | { kind: 'correction'; correction: Correction, range: Interval };


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    const correctionSegments: Segment[] = document.corrections.map(c => ({ kind: 'correction', correction: c, range: [c.range.start, c.range.end] }));

    const correctionIntervals: Interval[] = document.corrections.map(c => [c.range.start, c.range.end]);
    const gaps = complement(correctionIntervals, [0, document.content.length]);

    const textSegments: Segment[] = gaps.map(([start, end]) => ({ kind: 'text', text: document.content.slice(start, end), range: [start, end] }));
    const segments = [...correctionSegments, ...textSegments].toSorted((a, b) => a.range[0] - b.range[0]);

    return segments;
  }
}
