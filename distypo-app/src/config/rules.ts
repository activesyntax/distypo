import { Rule } from "@core/domain/rules";
import { uniqId, UniqId } from "@utils/identity";

export type RuleId = UniqId<"RuleId">;

export const lowercaseSentenceStartRule: Rule = {
  id: uniqId("bf8999f4-12b7-474c-bbd6-6157a8390cdbbf8999f4-12b7-474c-bbd6-6157a8390cdb", "RuleId"),
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
  id: uniqId("c1e5b8f0-3a2e-4c9a-9f1b-8a7e5d6c9f1ac1e5b8f0-3a2e-4c9a-9f1b-8a7e5d6c9f1a", "RuleId"),
  name: 'double-space',
  description: 'Collapses multiple consecutive spaces into one.',
  hint: 'Multiple consecutive spaces should be collapsed into one.',
  regex: /( {2,})/gu,
  corrector: () => ' ',
};

export const spaceBeforePunctuationRule: Rule = {
  id: uniqId("d2f6a7e1-4b3c-4d8e-9f2c-7a6e5d8c9f2bd2f6a7e1-4b3c-4d8e-9f2c-7a6e5d8c9f2b", "RuleId"),
  name: 'space-before-punctuation',
  description: 'Removes space before sentence-ending punctuation.',
  hint: 'No space should appear before punctuation.',
  regex: /( +)([.!?,;:])/gu,
  corrector: (match) => match[2],
};

export const missingSpaceAfterPunctuationRule: Rule = {
  id: uniqId("e3f7b8c2-5d4e-4f9a-9f3d-6a7e5d9c8f3ce3f7b8c2-5d4e-4f9a-9f3d-6a7e5d9c8f3c", "RuleId"),
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
  id: uniqId("f4a8c9d3-6e5f-4a0b-9f4e-5a7e6d8c9f4df4a8c9d3-6e5f-4a0b-9f4e-5a7e6d8c9f4d", "RuleId"),
  name: 'starts-with-uppercase',
  description: 'The text should start with an uppercase letter.',
  hint: 'First letter should be uppercase.',
  regex: /^\p{Ll}/gu,
  corrector: (match) => match[0].toUpperCase(),
};

export const endsWithPunctuationRule: Rule = {
  id: uniqId("a5b9d0e4-7f6g-4b1c-9f5e-4a7e6d9c8f5ea5b9d0e4-7f6g-4b1c-9f5e-4a7e6d9c8f5e", "RuleId"),
  name: 'ends-with-punctuation',
  description: 'The text should end with punctuation (. ! ? or …).',
  hint: 'Text should end with punctuation.',
  regex: /(\p{L})\s*$/gu,
  corrector: (match) => `${match[1]}.`,
};

export const straightToSmartQuotesRule: Rule = {
  id: uniqId("a3f7c2e1-9b4d-4f8a-bc3e-7d2a1e5f9c08a3f7c2e1-9b4d-4f8a-bc3e-7d2a1e5f9c08", "RuleId"),
  name: 'straight-to-smart-quotes',
  description: 'Detects straight double quotation marks and suggests curly (smart) quotes.',
  hint: 'Replace straight quotes with typographic curly quotes.',
  regex: /"([^"]*)"/gu,
  corrector: (match: RegExpMatchArray) => {
    return `\u201C${match[1]}\u201D`;
  }
};

export const hyphenInNumericRangeRule: Rule = {
  id: uniqId("b2e4f6a8-3c5d-4e7f-8a9b-1c2d3e4f5a6bb2e4f6a8-3c5d-4e7f-8a9b-1c2d3e4f5a6b", "RuleId"),
  name: 'hyphen-in-numeric-range',
  description: 'Detects a hyphen used between numbers where an en-dash is expected.',
  hint: 'Use an en-dash (–) for numeric ranges.',
  regex: /(\d)-(\d)/gu,
  corrector: (match: RegExpMatchArray) => `${match[1]}\u2013${match[2]}`,
};

export const hyphenAsDashRule: Rule = {
  id: uniqId("c3f5a7b9-4d6e-5f8a-9b0c-2d3e4f5a6b7cc3f5a7b9-4d6e-5f8a-9b0c-2d3e4f5a6b7c", "RuleId"),
  name: 'hyphen-as-dash',
  description: 'Detects a hyphen used as a sentence-level dash (surrounded by spaces).',
  hint: 'Use an en-dash (–) with spaces for a dash in prose.',
  regex: /(\s)-(\s)/gu,
  corrector: (match: RegExpMatchArray) => `${match[1]}\u2013${match[2]}`,
};
