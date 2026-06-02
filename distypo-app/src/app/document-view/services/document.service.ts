import { inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentState } from '@app/state/document-state';
import { ContentSourceStore } from '@app/state/source/content-source-store';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private readonly corrections = inject(CorrectionService);
  private documentState = inject(DocumentState);

  private contentSourceStore = inject(ContentSourceStore);

  copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  analyse() {
    console.log('Analysing document...');
    console.log('Current draftText:', this.contentSourceStore.draftText());
    console.log('Current content:', this.contentSourceStore.content());

    this.contentSourceStore.setText(this.contentSourceStore.draftText());
  }

  clear() {
    this.contentSourceStore.setText('');
  }

  saveAsFile(text: string, filename = 'corrected-document.txt'): void {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }


  fixAllPending() {
    const doc = this.documentState.linted();
    if (!doc) return;
    this.corrections.fixAll(doc.corrections.map(c => c.id));
  }
}
