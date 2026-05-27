import { Component, computed, inject, input } from '@angular/core';
import { LintedDocument } from '@core/index';
import { CorrectionService } from './services/correction';
import { CorrectionSegment } from '@app/document-view/services/segmentation-service';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly correctionSegment = input.required<CorrectionSegment>();
  readonly document = input.required<LintedDocument>();

  private readonly correction = computed(() => this.correctionSegment().correction);

  private readonly correctionService = inject(CorrectionService);

  readonly selected = computed(() =>
    this.correctionService.selectedIds().has(this.correction().id)
  );

  readonly original = computed(() => (this.correctionSegment().context));
  readonly replacement = computed(() => this.correction().replacement);



  onSelect(e: MouseEvent) {
    const id = this.correction().id;
    (e.metaKey || e.ctrlKey) ? this.correctionService.toggle(id) : this.correctionService.select(id);
  }

  onKeep(e: MouseEvent) { e.stopPropagation(); this.correctionService.keep(this.correction().id); }
  onFix(e: MouseEvent) { e.stopPropagation(); this.correctionService.fix(this.correction().id); }
  onEdit(e: MouseEvent) { e.stopPropagation(); this.correctionService.edit(this.correction().id); }
}

