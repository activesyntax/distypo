import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  copy(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  paste(): Promise<string> {
    return navigator.clipboard.readText();
  }
}
