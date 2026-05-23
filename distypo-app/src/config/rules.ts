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



