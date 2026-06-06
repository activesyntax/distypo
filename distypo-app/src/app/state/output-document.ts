import { computed, inject, Injectable } from '@angular/core';
import { RuleService } from '@app/config/rule.service';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentState } from '@app/state/document-state';
import { InlineCorrectionSegment } from '@app/view-model/segment';
import { toSegments } from '@app/view-model/segment-operations';
import { resolveCorrectionSegment } from '@app/view-model/segment-resolver';

@Injectable({
  providedIn: 'root',
})
export class OutputDocument {

  private documentState = inject(DocumentState);
  private corrections = inject(CorrectionService);
  private rules = inject(RuleService);


  readonly segments = computed(() => {
    const doc = this.documentState.linted();
    return doc ? toSegments(doc) : [];
  });

  readonly plainText = computed(() => this.asPlainText());

  private asPlainText(): string {
    return this.segments()
      .filter(s => s.kind !== 'correction')
      .map(s => (s.kind === 'text' ? s.text : this.correctionText(s)))
      .join('');
  }

  correctionText(seg: InlineCorrectionSegment): string {

    // TODO: to many parameters - simplify
    return resolveCorrectionSegment(
      seg,
      this.documentState.linted()!.content,
      id => this.corrections.statusOf(id),
      id => this.rules.findRule(id)
    )
  }
}
