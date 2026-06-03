import { computed, inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentState } from '@app/state/document-state';
import { CorrectionSegment, InlineCorrectionSegment, resolveCorrectionSegment, Segment, toSegments } from '@app/view-model/segments';

@Injectable({
  providedIn: 'root',
})
export class OutputDocument {

  private documentState = inject(DocumentState);
  private corrections = inject(CorrectionService);


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
    // return resolveCorrectionSegment(seg, this.corrections.statusOf(seg.correction.id));
    return resolveCorrectionSegment(seg);

  }
}
