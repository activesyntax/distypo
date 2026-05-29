import { inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { CorrectionSegment, Segment, toCorrectionSegment, toTextSegment } from '@app/view-model/segments';
import { Correction, LintedDocument } from "@core/index";
import { complement, interval, Interval } from '@core/utils';



@Injectable()
export class SegmentationService {

  private correctionService: CorrectionService = inject(CorrectionService);

  split(document: LintedDocument): Segment[] {
    const correctionSegments: CorrectionSegment[] = document.corrections.map(c => toCorrectionSegment(c, document.content));

    const gaps = complement(
      correctionSegments.map(c => c.context.originalRange),
      interval(0, document.content.length)
    );

    console.log("gaps", gaps);

    const textSegments: Segment[] = gaps.map(range => toTextSegment(range, document.content.slice(range.start, range.end)));

    const allSegments = [...correctionSegments, ...textSegments].toSorted((a, b) => a.range.start - b.range.start);

    console.log("allSegments", allSegments);
    return allSegments;

  }

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
