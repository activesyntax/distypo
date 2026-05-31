import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { interval, Interval } from "@utils/interval";
import { createGuid } from "@utils/identity";

export const lint = (doc: RawDocument, rules: readonly Rule[]): LintedDocument => ({
  kind: "linted",
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
  replacement: rule.corrector(match),
})
