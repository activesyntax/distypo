import { Component, computed, inject, input } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { InlineCorrectionSegment } from '@app/view-model/segment';
import { CorrectionSegmentResolver } from '@app/view-model/services/correction-segment-resolver.service';

@Component({
  selector: 'app-inline-correction-view',
  imports: [],
  templateUrl: './inline-correction-view.html',
  styleUrl: './inline-correction-view.scss',
})
export class InlineCorrectionView {

  readonly segment = input.required<InlineCorrectionSegment>();
  readonly correctionService = inject(CorrectionService);
  readonly segmentResolver = inject(CorrectionSegmentResolver);

  readonly statuses = computed(() => this.segment().corrections.map(c => this.correctionService.statusOf(c.id)));

  readonly overallStatus = computed(() => {
    if (this.statuses().every(s => s.kind === 'fixed')) return { kind: 'fixed' } as const;
    if (this.statuses().every(s => s.kind === 'kept')) return { kind: 'kept' } as const;
    return { kind: 'pending' } as const;
  });

  readonly hasChanged = computed(() => this.statuses().some((s) => s.kind === 'fixed' || s.kind === 'kept'));

  readonly issueContext = computed(() =>
    this.segmentResolver.resolve(this.segment())
  );

  onUndo(e: MouseEvent) {
    e.stopPropagation();
    this.segment().corrections.forEach(c => this.correctionService.reset(c.id));
  }

}
