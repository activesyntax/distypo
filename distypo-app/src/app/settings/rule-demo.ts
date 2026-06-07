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
  { ruleId: doubleSpaceRule.id, original: 'See      you soon', replacement: 'See you soon' },
  { ruleId: spaceBeforePunctuationRule.id, original: 'Wait ,really?', replacement: 'Wait, really?' },
  { ruleId: missingSpaceAfterPunctuationRule.id, original: 'Done.Next up:', replacement: 'Done. Next up:' },
  { ruleId: lowercaseSentenceStartRule.id, original: 'Great idea. now let\'s begin.', replacement: 'Great idea. Now let\'s begin.' },
  { ruleId: startsWithUppercaseRule.id, original: 'thanks for your help', replacement: 'Thanks for your help' },
  { ruleId: endsWithPunctuationRule.id, original: 'Let me know what you think', replacement: 'Let me know what you think.' },
  { ruleId: straightToSmartQuotesRule.id, original: '"Brilliant!"', replacement: '\u201CBrilliant!\u201D' },
  { ruleId: hyphenInNumericRangeRule.id, original: 'open 9-17', replacement: 'open 9\u201317' },
  { ruleId: hyphenAsDashRule.id, original: 'Rome - the eternal city', replacement: 'Rome \u2013 the eternal city' },
  { ruleId: parenthesisSpacingRule.id, original: 'taxes( included )here', replacement: 'taxes (included) here' },
  { ruleId: ellipsisRule.id, original: 'Well...', replacement: 'Well\u2026' },
  { ruleId: capitalizationAfterEllipsisRule.id, original: 'And then\u2026 nothing.', replacement: 'And then\u2026 Nothing.' },
  { ruleId: multipleExclamationRule.id, original: 'Unbelievable!!', replacement: 'Unbelievable!' },
  { ruleId: apostropheRule.id, original: "I can't wait", replacement: 'I can\u2019t wait' },
];
