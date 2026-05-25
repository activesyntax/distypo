import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { pairwise, multiUnion, Interval } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string, range: Interval }
  | { kind: 'correction'; correction: Correction, range: Interval };


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    const sortedCorrections = document.corrections.toSorted((a: Correction, b: Correction) => a.range.start - b.range.start);

    const correctionSegments: Segment[] = sortedCorrections.map(c => ({ kind: 'correction', correction: c, range: [c.range.start, c.range.end] }));


    console.log('----------------------------------------');

    const gaps = findGapsImperative(sortedCorrections, document.content.length);
    console.log("Gaps:", gaps);

    const gapsNew = findGaps(sortedCorrections, document);
    console.log("Gaps NEW:", gapsNew);

    const textSegments: Segment[] = gaps.map(([start, end]) => ({ kind: 'text', text: document.content.slice(start, end), range: [start, end] })); const segments = [...correctionSegments, ...textSegments].sort((a, b) => a.range[0] - b.range[0]);

    console.log("Segments", segments);
    return segments;
  }
}

function findGapsImperative(
  sortedCorrections: readonly Correction[],
  documentLength: number,
): [number, number][] {
  if (sortedCorrections.length === 0) return [[0, documentLength]];

  const gaps: [number, number][] = [];
  let frontier = sortedCorrections[0].range.end;

  for (const correction of sortedCorrections.slice(1)) {
    if (correction.range.start <= frontier) {
      frontier = Math.max(frontier, correction.range.end);
    } else {
      gaps.push([frontier, correction.range.start]);
      frontier = correction.range.end;
    }
  }

  if (frontier < documentLength) {
    gaps.push([frontier, documentLength]);
  }

  return gaps;
}


function findGaps(
  sortedCorrections: readonly Correction[],
  document: LintedDocument
): Interval[] {
  if (sortedCorrections.length === 0) return [[0, document.content.length]];

  const correctionIntervals: Interval[] = sortedCorrections.map(c => [c.range.start, c.range.end]);
  const merge = multiUnion(...correctionIntervals);
  const gaps = [...pairwise(merge)].map((ipair) => [ipair[0][1], ipair[1][0]] as Interval);

  const lastInterval = merge[merge.length - 1];
  if (lastInterval[1] < document.content.length) {
    gaps.push([lastInterval[1], document.content.length]);
  }

  console.log("Merge", merge);
  console.log("Gaps from merge", gaps);

  return gaps;
}

