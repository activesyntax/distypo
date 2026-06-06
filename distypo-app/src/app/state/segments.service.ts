import { computed, inject, Injectable } from '@angular/core';
import { RuleService } from '@app/config/rule.service';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { CorrectionStatus } from '@app/state/correction-status';
import { Correction } from '@core/index';
import { DocumentState } from '@app/state/document-state';
import { InlineCorrectionSegment } from '@app/view-model/segment';
import { toSegments } from '@app/view-model/segment-operations';

@Injectable({
  providedIn: 'root',
})
export class CorrectionSegmentResolver {
  private corrections = inject(CorrectionService);
  private rules = inject(RuleService);
  private documentState = inject(DocumentState);


  resolve(segment: InlineCorrectionSegment): string {
    const content = this.documentState.linted()!.content

    const originalText = content.slice(segment.range.start, segment.range.end);

    return segment.corrections
      .map(c => ({ correction: c, status: this.corrections.statusOf(c.id) }))
      .filter(({ status }) => status.kind === 'fixed')
      .reduce(
        (text, { correction, status }) =>
          this.correctedText(text, correction, status),
        originalText
      );
  }

  readonly plainText = computed(() => this.asPlainText());

  readonly segments = computed(() => {
    const doc = this.documentState.linted();
    return doc ? toSegments(doc) : [];
  });

  private asPlainText(): string {
    return this.segments()
      .filter(s => s.kind !== 'correction')
      .map(s => (s.kind === 'text' ? s.text : this.resolve(s)))
      .join('');
  }

  private correctedText(text: string, correction: Correction, status: CorrectionStatus): string {

    if (status.kind === 'fixed' && status.customReplacement) {
      return status.customReplacement;
    }

    const rule = this.rules.findRule(correction.ruleId);

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
}
