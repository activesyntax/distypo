import { Component, computed, inject, input } from '@angular/core';
import { Correction, LintedDocument } from '@core/index';
import { CorrectionService } from './services/correction';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly correction = input.required<Correction>();
  readonly document = input.required<LintedDocument>();

  private readonly correctionService = inject(CorrectionService);

  readonly selected = computed(() =>
    this.correctionService.selectedIds().has(this.correction().id)
  );

  readonly original = computed(() => this.inContext(this.correction().original));
  readonly replacement = computed(() => this.inContext(this.correction().replacement));


  inContext(text: string): string {

    const content = this.document().content;

    const prefixEnd = this.correction().range.start;
    const prefixStart = content.lastIndexOf(' ', prefixEnd);

    const suffixStart = this.correction().range.end;
    const suffixEnd = content.indexOf(' ', suffixStart);

    return `${content.slice(prefixStart, prefixEnd)}${text}${content.slice(suffixStart, suffixEnd)}`;
  }


  onSelect(e: MouseEvent) {
    const id = this.correction().id;
    (e.metaKey || e.ctrlKey) ? this.correctionService.toggle(id) : this.correctionService.select(id);
  }

  onKeep(e: MouseEvent) { e.stopPropagation(); this.correctionService.keep(this.correction().id); }
  onFix(e: MouseEvent) { e.stopPropagation(); this.correctionService.fix(this.correction().id); }
  onEdit(e: MouseEvent) { e.stopPropagation(); this.correctionService.edit(this.correction().id); }
}

