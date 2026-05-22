import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class SafeHtmlService {
  constructor(private sanitizer: DomSanitizer) { }

  escape(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  convertNewlines(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  from(text: string): SafeHtml {
    const escaped = this.escape(text);
    const withBreaks = this.convertNewlines(escaped);
    return this.sanitizer.bypassSecurityTrustHtml(withBreaks);
  }
}
