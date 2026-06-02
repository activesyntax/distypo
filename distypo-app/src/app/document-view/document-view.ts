import { afterNextRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CorrectionView } from '@app/correction-view/correction-view';
import { DocumentService } from './services/document.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentState } from '@app/state/document-state';
import { OutputDocument } from '@app/state/output-document';
import { ContentSourceStore } from '@app/state/source/content-source-store';


@Component({
  selector: 'app-document',
  imports: [CorrectionView, MatButtonModule, MatIconModule],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  documentState = inject(DocumentState);
  outputDocument = inject(OutputDocument);
  private documentService = inject(DocumentService);
  private contentSourceStore = inject(ContentSourceStore);

  readonly copied = signal(false);

  readonly rawText = this.contentSourceStore.draftText;

  private readonly DEMO_TEXT = `the meeting starts at noon.We started.  The quick  brown fox...  Are you serious ? "hello," she said. Read pages 12-18 - then decide. The result( see figure 3 )is clear`;

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
    console.log(this.textareaEl());
    this.textareaEl()?.nativeElement.focus();
  }
  clearTextt() {
    this.rawText.set('');
    this.documentService.clear();
    setTimeout(() => this.focusTextarea());
  }

  async copy() {
    try {
      await this.documentService.copyToClipboard(this.outputDocument.plainText());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // TODO: error message bar
      /* clipboard blocked */
    }
  }
}
