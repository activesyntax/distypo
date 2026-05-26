import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";
import { complement, interval, Interval } from '@core/utils';


export type TextSegment = { kind: 'text'; text: string; range: Interval };
export type CorrectionSegment = {
  kind: 'correction';
  correction: Correction;
  range: Interval;
  contextRange: Interval;
  context: string;
};

export type Segment = TextSegment | CorrectionSegment;


@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {
    const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

    const gaps = complement(
      correctionSegments.map(c => c.contextRange),
      interval(0, document.content.length)
    );

    console.log("gaps", gaps);


    // const splitPoints = correctionSegments.map(c => c.range.end);

    const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));
    const sortedCorrections = correctionSegments.toSorted((a, b) => a.range.start - b.range.start);
    // const textSegments: Segment[] = sortedCorrections.map((correction, index) =>
    //    toTextSegment)
    // );

    const allSegments = [...correctionSegments, ...textSegments].toSorted((a, b) => a.range.start - b.range.start);

    console.log("allSegments", allSegments);
    return allSegments;

  }
}

function toCorrectionSegment(c: Correction, content: string): CorrectionSegment {

  const ctx = contextRange(content, c);

  return {
    kind: 'correction',
    correction: c,
    range: c.range,
    contextRange: ctx,
    context: content.slice(ctx.start, ctx.end)
  }
}

const toTextSegment = (range: Interval, text: string): Segment => ({
  kind: 'text',
  text: text,
  range,
});



function contextRange(content: string, correction: Correction): Interval {

  const prefixEnd = correction.range.start;
  const prefixStart = content.lastIndexOf(' ', prefixEnd);

  const suffixStart = correction.range.end;
  const suffixEnd = content.indexOf(' ', suffixStart);

  return interval(prefixStart, suffixEnd);
}
