import { computed, inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentState } from '@app/state/document-state';
import { CorrectionSegment, resolveCorrectionSegment, Segment, toSegments } from '@app/view-model/segments';

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

  readonly documentText = computed(() => this.asText(this.segments()));

  asText(segments: Segment[]): string {
    return segments
      .map(s => (s.kind === 'text' ? s.text : this.displayText(s)))
      .join('');
  }

  displayText(seg: CorrectionSegment): string {
    return resolveCorrectionSegment(seg, this.corrections.statusOf(seg.correction.id));
  }
}
