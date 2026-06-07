import { afterNextRender, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CorrectionView } from '@app/correction-view/correction-view';
import { DocumentService } from './services/document.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentState } from '@app/state/document-state';
import { ContentSourceStore } from '@app/state/source/content-source-store';
import { InlineCorrectionView } from "@app/inline-correction-view/inline-correction-view";


@Component({
  selector: 'app-document',
  imports: [CorrectionView, MatButtonModule, MatIconModule, InlineCorrectionView],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  documentState = inject(DocumentState);
  private documentService = inject(DocumentService);
  private contentSourceStore = inject(ContentSourceStore);

  readonly copied = signal(false);

  readonly rawText = this.contentSourceStore.draftText;

  readonly segments = computed(() => this.documentState.segments());
  readonly plainText = computed(() => this.documentState.polished()?.content ?? '');

  // private readonly DEMO_TEXT = `The meeting starts at noon.        we started. The quick brown fox. independent issues `;

  private readonly DEMO_TEXT = `the meeting starts at noon.We started.  The quick  brown fox...  are you serious ? "hello," she said. Read pages 12-18 - then decide. The result( see figure 3 )is clear`;

  private textareaEl = viewChild<ElementRef<HTMLTextAreaElement>>('rawtext');

  onInput(event: Event) {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    this.rawText.set(el.value);
  }

  insertDemoText() {
    this.rawText.set(this.DEMO_TEXT);
  }

  constructor() {
    afterNextRender(() => this.focusTextarea());
  }

  private focusTextarea() {
    this.textareaEl()?.nativeElement.focus();
  }
  clearTextt() {
    this.rawText.set('');
    this.documentService.clear();
    setTimeout(() => this.focusTextarea());
  }

  async copy() {
    try {
      await this.documentService.copyToClipboard(this.plainText());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // TODO: error message bar
      /* clipboard blocked */
    }
  }
}
