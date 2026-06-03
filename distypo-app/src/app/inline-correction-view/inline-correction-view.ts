import { Component, computed, inject, input } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { OutputDocument } from '@app/state/output-document';
import { InlineCorrectionSegment } from '@app/view-model/segments';

@Component({
  selector: 'app-inline-correction-view',
  imports: [],
  templateUrl: './inline-correction-view.html',
  styleUrl: './inline-correction-view.scss',
})
export class InlineCorrectionView {

  readonly segment = input.required<InlineCorrectionSegment>();
  readonly correctionService = inject(CorrectionService);
  readonly outputDocument = inject(OutputDocument);

  readonly overallStatus = computed(() => {
    const statuses = this.segment().corrections.map(c => this.correctionService.statusOf(c.id));
    if (statuses.every(s => s.kind === 'fixed')) return { kind: 'fixed' } as const;
    if (statuses.every(s => s.kind === 'kept')) return { kind: 'kept' } as const;
    return { kind: 'pending' } as const;
  });

  readonly issueContext = computed(() =>
    this.outputDocument.correctionText(this.segment())
  );

  onUndo(e: MouseEvent) {
    e.stopPropagation();
    this.segment().corrections.forEach(c => this.correctionService.reset(c.id));
  }

}
