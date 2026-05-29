import { inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { CorrectionSegment, Segment, toCorrectionSegment, toTextSegment } from '@app/view-model/segments';


@Injectable()
export class SegmentationService {

  private correctionService: CorrectionService = inject(CorrectionService);

  asText(segments: Segment[]): string {

    const text = segments.reduce((acc: string, seg: Segment) => {
      switch (seg.kind) {
        case 'text': return acc + seg.text;
        case 'correction': return acc + this.asDisplayText(seg);
      }
    }, '');

    return text;
  }

  asDisplayText(segment: CorrectionSegment): string {

    const status = this.correctionService.statusOf(segment.correction.id)
    const ctx = segment.context;
    switch (status.kind) {
      case 'pending':
      case 'kept':
        return ctx.original;
      case 'fixed':
        return status.customReplacement ?? ctx.replacement;
      default: return ''
    }
  }
}
