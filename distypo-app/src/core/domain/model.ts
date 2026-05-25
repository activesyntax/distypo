import { Interval, UniqId } from "@core/utils";

export type RawDocument = { kind: "raw"; name: string; content: string };
export type LintedDocument = { kind: "linted"; name: string; content: string; corrections: readonly Correction[] };
export type PolishedDocument = { kind: "polished"; name: string; content: string };

export type TextDocument = RawDocument | LintedDocument | PolishedDocument;


export type CorrectionId = UniqId<"CorrectionId">;

export type Correction = {
  id: CorrectionId;
  range: Interval;
  replacement: string;
  // description: string;
  // rule: string;
};


