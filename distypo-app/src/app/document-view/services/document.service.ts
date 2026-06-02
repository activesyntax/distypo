import { inject, Injectable } from '@angular/core';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentState } from '@app/state/document-state';
import { LintedDocument } from '@core/index';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private readonly corrections = inject(CorrectionService);
  private documentState = inject(DocumentState);

  copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
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
