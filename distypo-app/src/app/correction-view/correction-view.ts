import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { CorrectionService } from './services/correction.service';
import { CorrectionSegment } from '@app/view-model/segment';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly segment = input.required<CorrectionSegment>();

  readonly correction = computed(() => this.segment().correction);

  private readonly editInput =
    viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor(private correctionService: CorrectionService) {
    effect(() => {
      const isEditing = this.isEditing();
      const input = this.editInput();
      if (isEditing && input) {
        input.nativeElement.focus();
        input.nativeElement.select();
      }
    });
  }

  readonly status = computed(() =>
    this.correctionService.statusOf(this.correction().id)
  );

  readonly isEditing = computed(() =>
    this.correctionService.editingId() === this.correction().id
  );

  readonly original = computed(() => this.segment().context.original);
  readonly replacement = computed(() => this.segment().context.replacement);

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

  onInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._commitFromInput(e.target as HTMLInputElement);
    } else if (e.key === 'Escape') {
      debugger;
      e.preventDefault();
      this.correctionService.cancelEdit();
    }
  }


  onConfirm(e: MouseEvent) {
    e.stopPropagation();
    const input = this.editInput()?.nativeElement;
    if (input) this._commitFromInput(input);
  }

  onCancelEdit(e?: MouseEvent) {
    e?.stopPropagation();
    this.correctionService.cancelEdit();
  }

  private _commitFromInput(input: HTMLInputElement) {
    const value = input.value
    if (value) {
      this.correctionService.commitEdit(this.correction().id, value);
    } else {
      this.correctionService.cancelEdit();
    }
  }
}
