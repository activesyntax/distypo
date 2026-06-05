import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { CorrectionService } from './services/correction.service';
import { CorrectionSegment } from '@app/view-model/segments';

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

  /**
   * Set to true by keydown handlers (Enter / Escape) so that the
   * subsequent blur event knows the action was already handled and
   * must not trigger a second commit/cancel.
   */
  private _keyHandled = false;

  constructor(private correctionService: CorrectionService) {
    effect(() => {
      const isEditing = this.isEditing();
      const input = this.editInput();
      if (isEditing && input) {
        this._keyHandled = false;
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
      this._keyHandled = true;
      this._commitFromInput(e.target as HTMLInputElement);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._keyHandled = true;
      this.correctionService.cancelEdit();
    }
  }

  onInputBlur(e: FocusEvent) {
    if (this._keyHandled) {
      this._keyHandled = false;
      return;
    }
    // Blur without a preceding key action → commit (user clicked away)
    this._commitFromInput(e.target as HTMLInputElement);
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
    const value = input.value.trim();
    if (value) {
      this.correctionService.commitEdit(this.correction().id, value);
    } else {
      this.correctionService.cancelEdit();
    }
  }
}
