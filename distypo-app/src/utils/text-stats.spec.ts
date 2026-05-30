import { describe, it, expect } from 'vitest';
import { countWords, countSentences, countLines } from './text-stats';

describe('countWords', () => {
  it('returns 0 for the empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('returns 0 for whitespace-only input', () => {
    expect(countWords('   \t\n  ')).toBe(0);
  });

  it('counts a single word', () => {
    expect(countWords('hello')).toBe(1);
  });

  it('counts words separated by single spaces', () => {
    expect(countWords('the quick brown fox')).toBe(4);
  });

  it('treats runs of whitespace as one separator', () => {
    expect(countWords('a  b   c')).toBe(3);
  });

  it('ignores leading and trailing whitespace', () => {
    expect(countWords('  hello world  ')).toBe(2);
  });

  it('treats tabs and newlines as whitespace', () => {
    expect(countWords('a\tb\nc\r\nd')).toBe(4);
  });

  it('treats non-breaking space as whitespace', () => {
    expect(countWords('a\u00A0b')).toBe(2);
  });

  it('counts hyphenated forms as one word', () => {
    expect(countWords('well-being mother-in-law')).toBe(2);
  });

  it('counts contractions as one word', () => {
    expect(countWords("it's don't")).toBe(2);
  });

  it('handles Hungarian accented characters', () => {
    expect(countWords('árvíztűrő tükörfúrógép')).toBe(2);
  });

  it('counts punctuation-only tokens as words', () => {
    // Documents current behavior: any non-whitespace run counts.
    // If this is unwanted, switch the implementation to /\p{L}[\p{L}\p{N}'-]*/gu
    expect(countWords('hello ... world')).toBe(3);
  });
});

describe('countSentences', () => {
  it('returns 0 for the empty string', () => {
    expect(countSentences('')).toBe(0);
  });

  it('returns 0 for text with no terminators', () => {
    expect(countSentences('this has no end')).toBe(0);
  });

  it('counts a single sentence ending in a period', () => {
    expect(countSentences('Hello world.')).toBe(1);
  });

  it('counts sentences ending with ?, !, and …', () => {
    expect(countSentences('What? Wow! Hmm…')).toBe(3);
  });

  it('groups consecutive terminators as one sentence end', () => {
    expect(countSentences('Really?! Yes!!!')).toBe(2);
  });

  it('counts multiple sentences in a paragraph', () => {
    expect(countSentences('First. Second. Third.')).toBe(3);
  });

  it('requires whitespace or end-of-string after the terminator', () => {
    // The lookahead means "3.14" is not a sentence boundary.
    expect(countSentences('Pi is 3.14 approximately.')).toBe(1);
  });

  it('counts the final sentence even without trailing whitespace', () => {
    expect(countSentences('Done.')).toBe(1);
  });

  it('ignores sentence-final periods inside abbreviations followed by no space', () => {
    // "e.g.is" — the period before "is" isn't followed by whitespace, so not counted.
    expect(countSentences('e.g.is unusual')).toBe(0);
  });

  it('OVERCOUNTS abbreviations followed by space — known limitation', () => {
    // Dr. Smith arrived. → counts as 2, ideally 1. Documents current behavior;
    // upgrade to Intl.Segmenter if accurate sentence segmentation is needed.
    expect(countSentences('Dr. Smith arrived.')).toBe(2);
  });
});

describe('countLines', () => {
  it('returns 0 for the empty string', () => {
    expect(countLines('')).toBe(0);
  });

  it('counts a single unterminated line', () => {
    expect(countLines('hello')).toBe(1);
  });

  it('counts a single line terminated by \\n', () => {
    expect(countLines('hello\n')).toBe(1);
  });

  it('counts two lines', () => {
    expect(countLines('a\nb')).toBe(2);
  });

  it('does not count a trailing newline as an extra line', () => {
    expect(countLines('a\nb\n')).toBe(2);
  });

  it('counts a blank line in the middle', () => {
    expect(countLines('a\n\nb')).toBe(3);
  });

  it('handles \\r\\n line endings', () => {
    expect(countLines('a\r\nb\r\nc')).toBe(3);
  });

  it('handles classic Mac \\r line endings', () => {
    expect(countLines('a\rb\rc')).toBe(3);
  });

  it('handles mixed line endings', () => {
    expect(countLines('a\nb\r\nc\rd')).toBe(4);
  });

  it('treats a string of only a newline as one (empty) line', () => {
    // The string before the \n is "", the string after is "". Trailing empty
    // is stripped → one line remains.
    expect(countLines('\n')).toBe(1);
  });
});
