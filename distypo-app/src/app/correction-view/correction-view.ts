import { Component, computed, inject, input } from '@angular/core';
import { CorrectionSegment } from '@app/document-view/services/segmentation-service';
import { CorrectionService } from './services/correction.service';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly segment = input.required<CorrectionSegment>();

  private readonly correctionService = inject(CorrectionService);
  private readonly correction = computed(() => this.segment().correction);

  readonly status = computed(() =>
    this.correctionService.statuses().get(this.correction().id) ?? 'pending'
  );

  readonly original = computed(() => this.segment().context.original);
  readonly replacement = computed(() => this.segment().context.replacement);

  // What inline text the correction shows in the running document
  readonly displayText = computed(() =>
    this.status() === 'fixed' ? this.replacement() : this.original()
  );

  onKeep(e: MouseEvent) {
    e.stopPropagation();
    this.correctionService.keep(this.correction().id);
  }

  onFix(e: MouseEvent) {
    e.stopPropagation();
    this.correctionService.fix(this.correction().id);
  }

  onEdit(e: MouseEvent) {
    e.stopPropagation();
    this.correctionService.edit(this.correction().id);
  }

  onUndo(e: MouseEvent) {
    e.stopPropagation();
    console.log('undo', this.correction().id);
    this.correctionService.reset(this.correction().id);
  }
}
