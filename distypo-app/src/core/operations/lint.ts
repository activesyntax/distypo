import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { TextRange } from "@core/domain/text-range";
import { createGuid } from "@core/utils";
import { rules } from "@config/rules";


export function lint(doc: RawDocument): LintedDocument {

  const corrections: Correction[] = getCorrections(doc, rules);

  console.log('Corrections:', corrections);

  const lintedDoc: LintedDocument = {
    kind: "linted",
    name: doc.name,
    content: doc.content,
    corrections,
  };
  return lintedDoc;
}

function getCorrections(doc: RawDocument, rules: Rule[]): Correction[] {

  const corrections: Correction[] = rules.flatMap(rule => {
    const matches = [...doc.content.matchAll(rule.regex)];
    return matches.map(match => toCorrection(rule, match));
  });

  return corrections;
}

function toTextRange(match: RegExpMatchArray): TextRange {
  return {
    start: (match.index || 0),
    end: (match.index || 0) + match[0].length,
    __brand: 'TextRange',
  };
}

function toCorrection(rule: Rule, match: RegExpMatchArray): Correction {

  return {
    id: createGuid("CorrectionId"),
    range: toTextRange(match),
    replacement: rule.corrector(match)
  };
}
