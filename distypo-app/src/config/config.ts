import { lowercaseSentenceStartRule, doubleSpaceRule, spaceBeforePunctuationRule, missingSpaceAfterPunctuationRule, startsWithUppercaseRule, endsWithPunctuationRule, straightToSmartQuotesRule } from "@config/rules";

export const Config = {
  rules: [
    lowercaseSentenceStartRule,
    doubleSpaceRule,
    spaceBeforePunctuationRule,
    missingSpaceAfterPunctuationRule,
    startsWithUppercaseRule,
    endsWithPunctuationRule,
    straightToSmartQuotesRule,
  ]
}
