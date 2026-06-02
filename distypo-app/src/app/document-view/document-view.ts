import { Component, inject, signal } from '@angular/core';
import { CorrectionView } from '@app/correction-view/correction-view';
import { DocumentService } from './services/document.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentState } from '@app/state/document-state';
import { OutputDocument } from '@app/state/output-document';


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

  readonly copied = signal(false);

  readonly rawText = signal('');

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
