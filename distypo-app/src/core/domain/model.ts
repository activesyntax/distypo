import { Interval } from "@utils/interval";
import { UniqId } from "@utils/identity";

export type RawDocument = { kind: "raw"; content: string };
export type LintedDocument = { kind: "linted"; content: string; corrections: readonly Correction[] };
export type PolishedDocument = { kind: "polished"; content: string };

export type TextDocument = RawDocument | LintedDocument | PolishedDocument;


export type CorrectionId = UniqId<"CorrectionId">;

export type Correction = {
  id: CorrectionId;
  range: Interval;
  original: string;
  replacement: string;
  hint: string;
  ruleId: UniqId<"RuleId">;
};


