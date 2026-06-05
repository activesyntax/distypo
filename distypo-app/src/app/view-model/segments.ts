import { CorrectionStatus } from "@app/state/correction-status";
import { RuleId } from "@config/rules";
import { CorrectionId } from "@core/domain/model";
import { Rule } from "@core/domain/rules";
import { Correction, LintedDocument } from "@core/index";
import { complement, intersection, interval, Interval, intervalCompare, union } from "@utils/interval";

import { createGuid, UniqId } from "@utils/identity";

type IdentifiedSegment = { id: UniqId<"SegmentId"> };

export type TextSegment = IdentifiedSegment & { kind: 'text'; text: string; range: Interval };
export type CorrectionSegment = IdentifiedSegment & {
  kind: 'correction';
  correction: Correction;
  range: Interval;
  context: {
    originalRange: Interval;
    original: string;
    replacement: string;
  }
};
export type InlineCorrectionSegment = IdentifiedSegment & {
  kind: 'inline-correction';
  corrections: Correction[];
  range: Interval;
}

export type Segment = TextSegment | CorrectionSegment | InlineCorrectionSegment;

export function toCorrectionSegment(correction: Correction, content: string): CorrectionSegment {

  const originalContextRange = contextRange(content, correction);
  const replacementText =
    content.slice(originalContextRange.start, correction.range.start)
    + correction.replacement
    + content.slice(correction.range.end, originalContextRange.end);

  return {
    id: createGuid("SegmentId"),
    kind: 'correction',
    correction,
    range: correction.range,
    context: {
      originalRange: originalContextRange,
      original: content.slice(originalContextRange.start, originalContextRange.end),
      replacement: replacementText,
    },
  }
}

export const toTextSegment = (range: Interval, text: string): Segment => ({

  id: createGuid("SegmentId"),
  kind: 'text',
  text: text,
  range,
});

const isWhitespace = (ch: string): boolean => /[\s\u00A0]/.test(ch);

const findWhitespaceBefore = (content: string, end: number): number | undefined => {
  const idx = [...content.slice(0, end)].findLastIndex(isWhitespace);
  return idx === -1 ? undefined : idx;
};

const findWhitespaceAfter = (content: string, start: number): number | undefined => {
  const idx = [...content.slice(start)].findIndex(isWhitespace);
  return idx === -1 ? undefined : idx + start;
};


export function contextRange(content: string, correction: Correction): Interval {
  const spaceBefore = findWhitespaceBefore(content, correction.range.start);
  const spaceAfter = findWhitespaceAfter(content, correction.range.end);

  const start = spaceBefore !== undefined ? spaceBefore + 1 : 0;
  // const end = spaceAfter ?? content.length;
  const end = spaceAfter !== undefined ? spaceAfter + 1 : content.length;

  return interval(start, end);
}

export function toSegments(document: LintedDocument): Segment[] {
  const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

  const inlineSegments = inlineCorrectionSegments(correctionSegments);

  const gaps = complement(
    correctionSegments.map(c => c.context.originalRange),
    interval(0, document.content.length)
  );

  const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

  const kindPriority = (kind: Segment['kind']): number =>
    kind === 'inline-correction' ? 0 : 1;

  const allSegments = [...correctionSegments, ...inlineSegments, ...textSegments]
    .toSorted((a, b) =>
      intervalCompare(a.range, b.range) ||
      kindPriority(a.kind) - kindPriority(b.kind)
    );

  console.log('SEGMENTS');
  console.log(allSegments);
  return allSegments;
}


export function inlineCorrectionSegments(correctionSegments: CorrectionSegment[]): InlineCorrectionSegment[] {

  const sortedCorrectionSegments = correctionSegments.toSorted((a, b) => intervalCompare(a.context.originalRange, b.context.originalRange));

  const unionOfIntervals = union(...sortedCorrectionSegments.map(c => c.context.originalRange));

  const correctionMap = unionOfIntervals.map(i => ({ interval: i, segments: intersectiingSegments(i, sortedCorrectionSegments) }));

  const inlineSegments: InlineCorrectionSegment[] = correctionMap.map(m => ({
    id: createGuid("SegmentId"),
    kind: 'inline-correction',
    range: m.interval,
    corrections: m.segments.map(s => s.correction),
  }));

  return inlineSegments;
}

function intersectiingSegments(interval: Interval, segments: CorrectionSegment[]): CorrectionSegment[] {
  return segments.filter(s => intersection(s.context.originalRange, interval) !== undefined);
}

export type FindRule = (id: RuleId) => Rule | undefined;
export type GetCorrectionStatus = (id: CorrectionId) => CorrectionStatus;

export function resolveCorrectionSegment(
  segment: InlineCorrectionSegment,
  content: string,
  statusOf: GetCorrectionStatus,
  findRule: FindRule
): string {
  const originalText = content.slice(segment.range.start, segment.range.end);

  console.log('Original text', originalText);
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

  console.log('Correcting text:', text, ' with correction: ', correction);

  if (!rule) {
    console.warn('Could not find rule for correction', correction);
    return text;
  }

  const match = text.matchAll(rule.regex).next().value;
  if (!match) {
    console.warn('Could not find match for rule', rule.name, 'Text: ', text);
    return text;
  }

  console.log('Match', match);
  const correctedText = text.slice(0, match.index) + rule.corrector(match) + text.slice(match.index + match[0].length);

  console.log('Corrected text', correctedText);

  return correctedText;
}
