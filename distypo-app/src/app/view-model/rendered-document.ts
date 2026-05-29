import { inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import {
  CorrectionSegment,
  Segment,
  resolveCorrectionSegment,
  toSegments,
} from '@app/view-model/segments';
import { LintedDocument } from '@core/index';

@Injectable()
export class RenderedDocument {
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
}
