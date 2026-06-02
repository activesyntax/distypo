import { Rule } from "@core/domain/rules";

export const lowercaseSentenceStartRule: Rule = {
  name: 'lowercase-sentence-start',
  description: 'Detects sentences that start with a lowercase letter after punctuation.',
  hint: 'Sentence should start with an uppercase letter.',
  regex: /([.!?])(\s+)(\p{Ll})/gu,
  corrector: (match: RegExpMatchArray) => {
    const punctuation = match[1];
    const whitespace = match[2];
    const lowercaseLetter = match[3];
    return `${punctuation}${whitespace}${lowercaseLetter.toUpperCase()}`;
  }
};

export const doubleSpaceRule: Rule = {
  name: 'double-space',
  description: 'Collapses multiple consecutive spaces into one.',
  hint: 'Multiple consecutive spaces should be collapsed into one.',
  regex: /( {2,})/gu,
  corrector: () => ' ',
};

export const spaceBeforePunctuationRule: Rule = {
  name: 'space-before-punctuation',
  description: 'Removes space before sentence-ending punctuation.',
  hint: 'No space should appear before punctuation.',
  regex: /( +)([.!?,;:])/gu,
  corrector: (match) => match[2],
};

export const missingSpaceAfterPunctuationRule: Rule = {
  name: 'missing-space-after-punctuation',
  description: 'Inserts a space after punctuation when followed directly by a word character.',
  hint: 'Punctuation should be followed by a space.',
  // regex: /([,;:])(\p{L})/gu,
  regex: /([,;:])(\p{L})|(\.)(\p{Lu})/gu,
  corrector: (match) => {
    const before = match[1] ?? match[3];
    const after = match[2] ?? match[4];
    return `${before} ${after}`;
  },
};

export const startsWithUppercaseRule: Rule = {
  name: 'starts-with-uppercase',
  description: 'The text should start with an uppercase letter.',
  hint: 'First letter should be uppercase.',
  regex: /^\p{Ll}/gu,
  corrector: (match) => match[0].toUpperCase(),
};

export const endsWithPunctuationRule: Rule = {
  name: 'ends-with-punctuation',
  description: 'The text should end with punctuation (. ! ? or …).',
  hint: 'Text should end with punctuation.',
  regex: /(\p{L})\s*$/gu,
  corrector: (match) => `${match[1]}.`,
};
