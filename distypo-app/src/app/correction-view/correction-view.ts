import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
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

  readonly correctionService = inject(CorrectionService);
  readonly correction = computed(() => this.segment().correction);

  // The editable input — only present in the DOM while this correction is being edited.
  private readonly editInput =
    viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor() {
    // When this correction's editor opens, focus and select the input so the
    // user can immediately type or tweak the pre-filled suggestion.
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

  // Text shown inline in the prose: original for pending/kept,
  // custom text (if any) or the suggested replacement for fixed.
  readonly displayText = computed(() => {
    const status = this.status();
    const ctx = this.segment().context;
    switch (status.kind) {
      case 'pending':
      case 'kept':
        return ctx.original;
      case 'fixed':
        return status.customReplacement ?? ctx.replacement;
    }
  });

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
    this.correctionService.reset(this.correction().id);
  }

  // Commit on Enter or blur; ignore empty input (treat as cancel).
  onCommitEdit(e: Event) {
    const value = (e.target as HTMLInputElement).value.trim();
    if (value) {
      this.correctionService.commitEdit(this.correction().id, value);
    } else {
      this.correctionService.cancelEdit();
    }
  }

  onCancelEdit() {
    this.correctionService.cancelEdit();
  }
}
