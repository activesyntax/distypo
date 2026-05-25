import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { pairwise } from '@core/utils';

export type Segment =
  | { kind: 'text'; text: string, range: SegmentBoundary }
  | { kind: 'correction'; correction: Correction, range: SegmentBoundary };

type SegmentKind = "text" | "correction";

type SegmentBoundary = [number, number];
type Interval = [number, number];
// type SegmentMap = [SegmentKind, SegmentBoundary];



export function union(interval1: Interval, interval2: Interval): Interval[] {

  const isOverlap = interval1[0] <= interval2[1] && interval1[1] >= interval2[0];

  if (isOverlap) {
    return [
      [Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])],
    ];
  }

  return [interval1, interval2];
}


export function mergedIntervals(
  sortedCorrections: readonly Correction[]
): Interval[] {

  const correctionIntervals: Interval[] = sortedCorrections.map(c => [c.range.start, c.range.end]);

  console.log("Correction intervals", correctionIntervals);

  let mergedIntervals: Interval[] = [];
  for (const interval of correctionIntervals) {

    console.log("Interval", interval);

    console.log("Merged intervals", mergedIntervals);
    if (mergedIntervals.length === 0) {
      console.log("Pushing interval", interval);
      mergedIntervals.push(interval);
    }
    else {

      const lastInterval: Interval = mergedIntervals.pop() ?? [0, 0];

      console.log("Last interval", lastInterval);

      const merged: Interval[] = union(lastInterval, interval);

      console.log("Merged", merged);

      mergedIntervals = mergedIntervals.concat(merged);

      console.log("Merged intervals", mergedIntervals);
    }

    console.log("Merged intervals", mergedIntervals);
    console.log("-----------------------------------------")
  }
  return mergedIntervals;

  // if (lastInterval[1] < documentLength) {
  //   correctionIntervals.push([lastInterval[1], documentLength]);
  // }

}



function findGaps(
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


function findGapsNew(
  sortedCorrections: readonly Correction[],
  document: LintedDocument
): Interval[] {
  if (sortedCorrections.length === 0) return [[0, document.content.length]];

  const merge = mergedIntervals(sortedCorrections);
  const gaps = [...pairwise(merge)].map((ipair) => [ipair[0][1], ipair[1][0]] as Interval);

  const lastInterval = merge[merge.length - 1];
  if (lastInterval[1] < document.content.length) {
    gaps.push([lastInterval[1], document.content.length]);
  }

  console.log("Merge", merge);
  console.log("Gaps from merge", gaps);

  return gaps;
}


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    const sortedCorrections = document.corrections.toSorted((a: Correction, b: Correction) => a.range.start - b.range.start);

    const correctionSegments: Segment[] = sortedCorrections.map(c => ({ kind: 'correction', correction: c, range: [c.range.start, c.range.end] }));


    console.log('----------------------------------------');

    const gaps = findGaps(sortedCorrections, document.content.length);
    console.log("Gaps:", gaps);

    const gapsNew = findGapsNew(sortedCorrections, document);
    console.log("Gaps NEW:", gapsNew);

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

