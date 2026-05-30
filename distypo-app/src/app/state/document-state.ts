import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Config } from '@config/config';
import { InputFile, lint, LintedDocument } from '@core/index';
import * as RawDoc from '@core/domain/raw-document';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { countWords, countSentences, countLines } from '@utils/text-stats';

@Injectable({
  providedIn: 'root',
})
export class DocumentState {

  private readonly _inputFile = signal<InputFile>({
    name: 'demo.txt',
    path: '/assets/data/demo.txt',
  });
  private corrections = inject(CorrectionService);

  // Pure read accessor for components that need to know what's loaded.
  // readonly inputFile = this._inputFile.asReadonly();

  readonly inputFile: InputFile = { name: 'demo.txt', path: '/assets/data/demo.txt' };

  private readonly fileResource = httpResource.text(() => this.inputFile.path);

  readonly loading = computed(() =>
    this.fileResource.status() === 'loading'
  );

  readonly error = computed(() =>
    this.fileResource.status() === 'error'
      ? "Failed to load document."
      : undefined
  );

  readonly linted = computed<LintedDocument | undefined>(() => {
    if (this.fileResource.status() !== 'resolved') return undefined;

    const file = this.fileResource.value();
    if (!file) return undefined;

    const rawDocument = RawDoc.from(this.inputFile.name, file);
    const lintedDocument = lint(rawDocument, Config.rules);

    return lintedDocument;
  });

  readonly contentSizeBytes = computed(() => {
    const content = this.fileResource.value();
    return content ? new TextEncoder().encode(content).length : 0;
  });

  readonly wordCount = computed(() => countWords(this.fileResource.value() ?? ''));
  readonly sentenceCount = computed(() => countSentences(this.fileResource.value() ?? ''));
  readonly lineCount = computed(() => countLines(this.fileResource.value() ?? ''));


  /** Replace the current document with a new file. */
  load(file: InputFile) {
    this._inputFile.set(file);
  }

  /** Replace the current document with pasted text (no HTTP). */
  loadText(name: string, content: string) {
    // If/when you implement paste, push raw text through lint here
    // and store the linted doc directly in a signal instead of HTTP.
  }

  fixAllPending() {
    const doc = this.linted();
    if (!doc) return;
    this.corrections.fixAll(doc.corrections.map(c => c.id));
  }
}
