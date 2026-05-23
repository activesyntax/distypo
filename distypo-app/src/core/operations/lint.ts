import { Correction, LintedDocument, RawDocument } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { TextRange } from "@core/domain/text-range";
import { createGuid } from "@core/utils";


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

  const corrections: Correction[] = getCorrections(doc, rules);

  // const corrections: Correction[] = rules.flatMap(rule => {
  //   const ranges = [...doc.content.matchAll(rule.regex)].map(matchToTextRange);
  //
  //   return ranges.map(range => { rangeToCorrection(range, rule) }
  //   );
  // }
  // );

  // const corrections: Correction[] =
  //   matches.map(range => ({
  //
  //     id: createGuid("CorrectionId"),
  //     range,
  //     replacement: doc.content.slice(range.start, range.end).toUpperCase(), // example replacement logic
  //   }));
  //

  // console.log('Issues found:', issues);

  const lintedDoc: LintedDocument = {
    kind: "linted",
    name: doc.name,
    content: doc.content,
    corrections,
  };
  return lintedDoc;
}

function getCorrections(doc: RawDocument, rules: Rule[]): Correction[] {
  const corrections: Correction[] = [];

  return [];
}

function matchToTextRange(match: RegExpMatchArray): TextRange {
  return {
    start: (match.index || 0),
    end: (match.index || 0) + match[0].length,
    __brand: 'TextRange',
  }
}

function rangeToCorrection(range: unknown, rule: Rule) {
}
