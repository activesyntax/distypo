import { Correction } from "@core/index";
import { Interval } from "@core/utils";

export type TextSegment = { kind: 'text'; text: string; range: Interval };
export type CorrectionSegment = {
  kind: 'correction';
  correction: Correction;
  range: Interval;
  context: {
    originalRange: Interval;
    original: string;
    replacement: string;
  }
};

export type Segment = TextSegment | CorrectionSegment;

