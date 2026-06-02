import { lowercaseSentenceStartRule, doubleSpaceRule, spaceBeforePunctuationRule, missingSpaceAfterPunctuationRule, startsWithUppercaseRule, endsWithPunctuationRule } from "@config/rules";

export const Config = {
  rules: [
    lowercaseSentenceStartRule,
    doubleSpaceRule,
    spaceBeforePunctuationRule,
    missingSpaceAfterPunctuationRule,
    startsWithUppercaseRule,
    endsWithPunctuationRule,
  ]
}
