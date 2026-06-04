import { lowercaseSentenceStartRule, doubleSpaceRule, spaceBeforePunctuationRule, missingSpaceAfterPunctuationRule, startsWithUppercaseRule, endsWithPunctuationRule, straightToSmartQuotesRule, hyphenInNumericRangeRule, hyphenAsDashRule, parenthesisSpacingRule } from "@config/rules";

export const Config = {
  rules: [
    lowercaseSentenceStartRule,
    doubleSpaceRule,
    spaceBeforePunctuationRule,
    missingSpaceAfterPunctuationRule,
    startsWithUppercaseRule,
    endsWithPunctuationRule,
    straightToSmartQuotesRule,
    hyphenInNumericRangeRule,
    hyphenAsDashRule,
    parenthesisSpacingRule
  ]
}

