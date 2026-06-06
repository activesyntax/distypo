import { CorrectionStatus } from "@app/state/correction-status";
import { RuleId } from "@config/rules";
import { CorrectionId } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { Correction } from "@core/index";
import { InlineCorrectionSegment } from "./segment";

export type FindRule = (id: RuleId) => Rule | undefined;
export type GetCorrectionStatus = (id: CorrectionId) => CorrectionStatus;

export function resolveCorrectionSegment(
  segment: InlineCorrectionSegment,
  content: string,
  statusOf: GetCorrectionStatus,
  findRule: FindRule
): string {
  const originalText = content.slice(segment.range.start, segment.range.end);

  return segment.corrections
    .map(c => ({ correction: c, status: statusOf(c.id) }))
    .filter(({ status }) => status.kind === 'fixed')
    .reduce(
      (text, { correction, status }) =>
        correctedText(text, correction, status, findRule),
      originalText
    );
}


function correctedText(text: string, correction: Correction, status: CorrectionStatus, findRule: FindRule): string {

  if (status.kind === 'fixed' && status.customReplacement) {
    return status.customReplacement;
  }

  const rule = findRule(correction.ruleId);

  if (!rule) {
    console.warn('Could not find rule for correction', correction);
    return text;
  }

  const match = text.matchAll(rule.regex).next().value;
  if (!match) {
    console.warn('Could not find match for rule', rule.name, 'Text: ', text);
    return text;
  }

  const correctedText = text.slice(0, match.index) + rule.corrector(match) + text.slice(match.index + match[0].length);

  return correctedText;
}
