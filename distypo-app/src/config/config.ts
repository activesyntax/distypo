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
  apostropheRule
} from "@config/rules";

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
    parenthesisSpacingRule,
    ellipsisRule,
    capitalizationAfterEllipsisRule,
    multipleExclamationRule,
    apostropheRule,
  ],

  demoTextLong: `it was a great conference.the speakers were very engaging, and the audience asked some really thoughtful questions.      I took a lot of notes and I think we can apply several ideas to our own work. anyway, "let's talk" about the key takeaways - I'll summarise the most important ones. the event ran from pages 12-18 of the programme, and sessions were scheduled from 9-17 each day. at some point during the afternoon break, someone asked: are you planning to attend next year ? I said I wasn't sure yet. The result( see appendix B )is quite promising, and we should revisit it before the next meeting...  more details will follow soon`,
}
