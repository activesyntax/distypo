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
  regex: /([,;:])(\p{L})/gu,
  corrector: (match) => `${match[1]} ${match[2]}`,
};


