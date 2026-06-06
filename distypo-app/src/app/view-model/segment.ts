import { Correction } from "@core/index";
import { UniqId } from "@utils/identity";
import { Interval } from "@utils/interval";

export type SegmentId = UniqId<"SegmentId">;
type IdentifiedSegment = { id: SegmentId };

export type TextSegment = IdentifiedSegment & { kind: 'text'; text: string; range: Interval };
export type CorrectionSegment = IdentifiedSegment & {
  kind: 'correction';
  correction: Correction;
  range: Interval;
  context: {
    originalRange: Interval;
    original: string;
    replacement: string;
  }
};
export type InlineCorrectionSegment = IdentifiedSegment & {
  kind: 'inline-correction';
  corrections: Correction[];
  range: Interval;
}

export type Segment = TextSegment | CorrectionSegment | InlineCorrectionSegment;
