import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentService {

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
}
