import { computed, inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentState } from '@app/state/document-state';
import { Segment, toSegments, CorrectionSegment, resolveCorrectionSegment } from '@app/view-model/segments';
import { LintedDocument } from '@core/index';

@Injectable({
  providedIn: 'root',
})
export class OutputDocument {

  private documentState = inject(DocumentState);
  private corrections = inject(CorrectionService);

  split(document: LintedDocument): Segment[] {
    return toSegments(document);
  }

  asText(segments: Segment[]): string {
    return segments
      .map(s => (s.kind === 'text' ? s.text : this.displayText(s)))
      .join('');
  }

  displayText(seg: CorrectionSegment): string {
    return resolveCorrectionSegment(seg, this.corrections.statusOf(seg.correction.id));
  }
  readonly segments = computed(() => {
    const doc = this.documentState.linted();
    return doc ? this.split(doc) : [];
  });

  readonly documentText = computed(() => this.asText(this.segments()));
}
