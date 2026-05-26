import { Component, computed, inject, input } from '@angular/core';
import { Correction } from '@core/index';
import { CorrectionService } from './services/correction';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly correction = input.required<Correction>();

  private readonly state = inject(CorrectionService);

  readonly selected = computed(() =>
    this.state.selectedIds().has(this.correction().id)
  );

  onSelect(e: MouseEvent) {
    const id = this.correction().id;
    (e.metaKey || e.ctrlKey) ? this.state.toggle(id) : this.state.select(id);
  }

  onKeep(e: MouseEvent) { e.stopPropagation(); this.state.keep(this.correction().id); }
  onFix(e: MouseEvent) { e.stopPropagation(); this.state.fix(this.correction().id); }
  onEdit(e: MouseEvent) { e.stopPropagation(); this.state.edit(this.correction().id); }
}
