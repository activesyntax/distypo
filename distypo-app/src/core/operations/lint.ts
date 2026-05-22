import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { TextRange } from "@core/domain/text-range";


export const lowercaseSentenceStartRule: Rule = {
  name: 'lowercase-sentence-start',
  description: 'Detects sentences that start with a lowercase letter after punctuation.',
  regex: /([.!?])\s+(\p{Ll})/gu,
  replacement: '$1 $2'.toUpperCase() // you can adjust this logic later
};

const rules: Rule[] = [
  lowercaseSentenceStartRule,
];

export function lint(doc: RawDocument): LintedDocument {

  const corrections: Correction[] = [];

  const matches = rules.flatMap(rule => {
    return [...doc.content.matchAll(rule.regex)].map(matchToTextRange);
  });

  const issues = matches;

  console.log('Issues found:', issues);

  const lintedDoc: LintedDocument = {
    kind: "linted",
    name: doc.name,
    content: doc.content,
    corrections,
  };
  return lintedDoc;
}

function matchToTextRange(match: RegExpMatchArray): TextRange {
  return {
    start: (match.index || 0),
    end: (match.index || 0) + match[0].length,
    __brand: 'TextRange',
  }
}
