import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { TextRange } from "@core/domain/text-range";
import { createGuid } from "@core/utils";


export const lowercaseSentenceStartRule: Rule = {
  name: 'lowercase-sentence-start',
  description: 'Detects sentences that start with a lowercase letter after punctuation.',
  regex: /([.!?])(\s+)(\p{Ll})/gu,
  corrector: (match: RegExpMatchArray) => {
    const punctuation = match[1];
    const whitespace = match[2];
    const lowercaseLetter = match[3];
    return `${punctuation}${whitespace}${lowercaseLetter.toUpperCase()}`;
  }
};

const rules: Rule[] = [
  lowercaseSentenceStartRule,
];

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

    const corrections = matches.map(match => toCorrection(rule, match));

    return corrections;
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
