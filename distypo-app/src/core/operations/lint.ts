import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { TextRange } from "@core/domain/text-range";
import { createGuid } from "@core/utils";


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

const toTextRange = (match: RegExpMatchArray): TextRange => {

  const start = match.index ?? 0;
  return {
    start,
    end: start + match[0].length,
    __brand: 'TextRange',
  };
};

const toCorrection = (rule: Rule, match: RegExpMatchArray): Correction => ({
  id: createGuid("CorrectionId"),
  range: toTextRange(match),
  replacement: rule.corrector(match)
})
