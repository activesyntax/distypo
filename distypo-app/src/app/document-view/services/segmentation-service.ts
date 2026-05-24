import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { pairwise } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'correction'; correction: Correction };

type SegmentKind = "text" | "correction";

type SegmentBoundary = [number, number];
type SegmentMap = [SegmentKind, SegmentBoundary];

@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    const sortedCorrections = document.corrections.toSorted((a: Correction, b: Correction) => a.range.start - b.range.start);
    const splitPoints = sortedCorrections.flatMap(c => [c.range.start, c.range.end]);

    console.log("Split points", splitPoints);


    const segmentMap: SegmentMap[] = [...pairwise(splitPoints)].map(
      ([start, end], i): SegmentMap => [
        i % 2 === 0 ? 'correction' : 'text',
        [start, end],
      ]
    );

    console.log("Segment map", segmentMap);

    const boindaries = [...pairwise(splitPoints)];

    console.log("Boundaries", boindaries);

    const segments: Segment[] = [...pairwise(splitPoints)]
      .map(([start, end], i): Segment =>
        i % 2 === 0
          ? { kind: 'correction', correction: document.corrections[i] }
          : { kind: 'text', text: document.content.slice(start, end) }
      )
      .filter(seg => seg.kind === 'correction' || seg.text.length > 0);


    console.log("Segments", segments);
    return segments;
  }
}

