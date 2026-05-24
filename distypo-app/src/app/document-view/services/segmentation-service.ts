import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { pairwise } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string, range: SegmentBoundary }
  | { kind: 'correction'; correction: Correction, range: SegmentBoundary };

type SegmentKind = "text" | "correction";

type SegmentBoundary = [number, number];
type SegmentMap = [SegmentKind, SegmentBoundary];


function findGaps(sortedCorrections: readonly Correction[], documentLength: number) {

  if (sortedCorrections.length === 0) return [];
  let gaps = [];
  let i = sortedCorrections[0].range.end;
  for (const correction of sortedCorrections.slice(1)) {
    if (correction.range.start <= i) {
      i = Math.max(i, correction.range.end);
    } else {
      gaps.push([i, correction.range.start]);
      i = correction.range.end;
    }
  }
  return gaps;
}

@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    const sortedCorrections = document.corrections.toSorted((a: Correction, b: Correction) => a.range.start - b.range.start);

    const correctionSegments: Segment[] = sortedCorrections.map(c => ({ kind: 'correction', correction: c, range: [c.range.start, c.range.end] }));

    const gaps = findGaps(sortedCorrections, document.content.length);
    console.log("Gaps", gaps);


    const textSegments: Segment[] = gaps.map(([start, end]) => ({ kind: 'text', text: document.content.slice(start, end), range: [start, end] })); const segments = [...correctionSegments, ...textSegments].sort((a, b) => a.range[0] - b.range[0]);


    // const correctionRanges = sortedCorrections.map(c => c.range);
    //
    // console.log("Correction ranges", correctionRanges);
    //
    //
    // const splitPoints = sortedCorrections.flatMap(c => [c.range.start, c.range.end]);
    //
    // console.log("Split points", splitPoints);
    //
    //
    // const segmentMap: SegmentMap[] = [...pairwise(splitPoints)].map(
    //   ([start, end], i): SegmentMap => [
    //     i % 2 === 0 ? 'correction' : 'text',
    //     [start, end],
    //   ]
    // );
    //
    // console.log("Segment map", segmentMap);
    //
    // const boindaries = [...pairwise(splitPoints)];
    //
    // console.log("Boundaries", boindaries);

    // const segments: Segment[] = [...pairwise(splitPoints)]
    //   .map(([start, end], i): Segment =>
    //     i % 2 === 0
    //       ? { kind: 'correction', correction: document.corrections[i] }
    //       : { kind: 'text', text: document.content.slice(start, end) }
    //   )
    //   .filter(seg => seg.kind === 'correction' || seg.text.length > 0);


    console.log("Segments", segments);
    return segments;
  }
}

