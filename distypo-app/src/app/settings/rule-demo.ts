import { UniqId } from "@utils/identity";
import {
  lowercaseSentenceStartRule,
  doubleSpaceRule,
  spaceBeforePunctuationRule,
  missingSpaceAfterPunctuationRule,
  startsWithUppercaseRule,
  endsWithPunctuationRule,
  straightToSmartQuotesRule,
  hyphenInNumericRangeRule,
  hyphenAsDashRule,
  parenthesisSpacingRule,
  ellipsisRule,
  capitalizationAfterEllipsisRule,
  multipleExclamationRule,
  apostropheRule,
} from "@config/rules";

export type RuleDemo = { ruleId: UniqId<"RuleId">; original: string; replacement: string };

export const ruleDemos: RuleDemo[] = [
  { ruleId: doubleSpaceRule.id, original: 'Hello  world', replacement: 'Hello world' },
  { ruleId: spaceBeforePunctuationRule.id, original: 'Hello ,world', replacement: 'Hello, world' },
  { ruleId: missingSpaceAfterPunctuationRule.id, original: 'Hello.World', replacement: 'Hello. World' },
  { ruleId: lowercaseSentenceStartRule.id, original: 'Hello. the end.', replacement: 'Hello. The end.' },
  { ruleId: startsWithUppercaseRule.id, original: 'the quick brown fox', replacement: 'The quick brown fox' },
  { ruleId: endsWithPunctuationRule.id, original: 'The quick brown fox', replacement: 'The quick brown fox.' },
  { ruleId: straightToSmartQuotesRule.id, original: '"hello"', replacement: '\u201Chello\u201D' },
  { ruleId: hyphenInNumericRangeRule.id, original: 'pages 12-18', replacement: 'pages 12\u201318' },
  { ruleId: hyphenAsDashRule.id, original: 'go - then stop', replacement: 'go \u2013 then stop' },
  { ruleId: parenthesisSpacingRule.id, original: 'result( see 3 )is', replacement: 'result (see 3) is' },
  { ruleId: ellipsisRule.id, original: 'and then...', replacement: 'and then\u2026' },
  { ruleId: capitalizationAfterEllipsisRule.id, original: 'and then\u2026 we', replacement: 'and then\u2026 We' },
  { ruleId: multipleExclamationRule.id, original: 'Wow!!', replacement: 'Wow!' },
  { ruleId: apostropheRule.id, original: "it's done", replacement: 'it\u2019s done' },
];
