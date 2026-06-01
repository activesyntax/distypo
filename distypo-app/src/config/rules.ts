import { Rule } from "@core/domain/rules";

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

export const doubleSpaceRule: Rule = {
  name: 'double-space',
  description: 'Collapses multiple consecutive spaces into one.',
  regex: /( {2,})/gu,
  corrector: () => ' ',
};

export const spaceBeforePunctuationRule: Rule = {
  name: 'space-before-punctuation',
  description: 'Removes space before sentence-ending punctuation.',
  regex: /( +)([.!?,;:])/gu,
  corrector: (match) => match[2],
};

export const missingSpaceAfterPunctuationRule: Rule = {
  name: 'missing-space-after-punctuation',
  description: 'Inserts a space after punctuation when followed directly by a word character.',
  regex: /([,;:])(\p{L})/gu,
  corrector: (match) => `${match[1]} ${match[2]}`,
};


