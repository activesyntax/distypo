import { Component, computed, inject, input } from '@angular/core';
import { CorrectionService } from './services/correction-service';
import { CorrectionSegment } from '@app/document-view/services/segmentation-service';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly segment = input.required<CorrectionSegment>();

  private readonly correction = computed(() => this.segment().correction);

  private readonly correctionService = inject(CorrectionService);

  readonly selected = computed(() =>
    this.correctionService.selectedIds().has(this.correction().id)
  );

  readonly original = computed(() => (this.segment().context.original));
  readonly replacement = computed(() => this.segment().context.replacement);


  onSelect(e: MouseEvent) {
    const id = this.correction().id;
    (e.metaKey || e.ctrlKey) ? this.correctionService.toggle(id) : this.correctionService.select(id);
  }

  onKeep(e: MouseEvent) { e.stopPropagation(); this.correctionService.keep(this.correction().id); }
  onFix(e: MouseEvent) { e.stopPropagation(); this.correctionService.fix(this.correction().id); }
  onEdit(e: MouseEvent) { e.stopPropagation(); this.correctionService.edit(this.correction().id); }
}

