import { Component, computed, inject, signal } from '@angular/core';
import { CorrectionView } from '@app/correction-view/correction-view';
import { DocumentService } from './services/document.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RenderedDocument } from '@app/view-model/rendered-document';
import { DocumentState } from '@app/state/document-state';


@Component({
  selector: 'app-document',
  imports: [CorrectionView, MatButtonModule, MatIconModule],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  private documentState = inject(DocumentState);
  private rendered = inject(RenderedDocument);
  private clipboard = inject(DocumentService);

  // Pass-through accessors so the template doesn't change
  readonly documentLoading = this.documentState.loading;
  readonly documentError = this.documentState.error;
  readonly lintedDocument = this.documentState.linted;

  readonly segments = computed(() => {
    const doc = this.lintedDocument();
    return doc ? this.rendered.split(doc) : [];
  });

  readonly documentText = computed(() => this.rendered.asText(this.segments()));

  readonly copied = signal(false);

  async copy() {
    try {
      await this.clipboard.copy(this.documentText());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // TODO: error message bar
      /* clipboard blocked */
}
  }
}
