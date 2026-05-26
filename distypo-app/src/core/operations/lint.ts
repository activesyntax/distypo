import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { createGuid, interval, Interval } from "@core/utils";

export const lint = (doc: RawDocument, rules: readonly Rule[]): LintedDocument => ({
  kind: "linted",
  name: doc.name,
  content: doc.content,
  corrections: collectCorrections(doc, rules),
})

const collectCorrections = (doc: RawDocument, rules: readonly Rule[]): Correction[] =>
  rules.flatMap(rule =>
    Array.from(doc.content.matchAll(rule.regex), match => toCorrection(rule, match))
  );

const toTextRange = (match: RegExpMatchArray): Interval => {

  const start = match.index ?? 0;
  return interval(start, start + match[0].length)
};

const toCorrection = (rule: Rule, match: RegExpMatchArray): Correction => ({
  id: createGuid("CorrectionId"),
  range: toTextRange(match),
  original: match[0],
  replacement: rule.corrector(match)
})
