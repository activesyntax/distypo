import { httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Config } from '@config/config';
import { InputFile, lint, LintedDocument } from '@core/index';
import * as RawDoc from '@core/domain/raw-document';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { countWords, countSentences, countLines } from '@utils/text-stats';
import { DocumentService } from '@app/document-view/services/document.service';

type ContentSource =
  | { kind: 'file'; file: InputFile }
  | { kind: 'text'; text: string };

@Injectable({
  providedIn: 'root',
})
export class DocumentState {

  private readonly _source = signal<ContentSource>({
    kind: 'file',
    file: { name: 'demo.txt', path: '/assets/data/demo.txt' },
  });

  private corrections = inject(CorrectionService);

  // Exposed for components that need to display the document name, etc.
  readonly inputFile = computed<InputFile>(() => {
    const src = this._source();
    return src.kind === 'file'
      ? src.file
      : { name: 'clipboard.txt', path: '' };
  });

  private readonly fileResource = httpResource.text(() => {
    const src = this._source();
    return src.kind === 'file' ? src.file.path : undefined;
  });

  private readonly _content = signal<string | undefined>(undefined);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | undefined>(undefined);

  constructor() {
    // Sync the httpResource into _content whenever it resolves.
    effect(() => {
      const src = this._source();
      if (src.kind !== 'file') return;

      const status = this.fileResource.status();
      this._loading.set(status === 'loading');

      if (status === 'resolved') {
        this._content.set(this.fileResource.value() ?? undefined);
        this._error.set(undefined);
      } else if (status === 'error') {
        this._error.set('Failed to load document.');
      }
    });
  }

  readonly loading: Signal<boolean> = this._loading.asReadonly();
  readonly error: Signal<string | undefined> = this._error.asReadonly();

  readonly linted = computed<LintedDocument | undefined>(() => {
    const content = this._content();
    if (!content) return undefined;

    const rawDocument = RawDoc.from(this.inputFile().name, content);
    return lint(rawDocument, Config.rules);
  });

  readonly contentSizeBytes = computed(() =>
    this._content() ? new TextEncoder().encode(this._content()!).length : 0
  );

  readonly wordCount = computed(() => countWords(this._content() ?? ''));
  readonly sentenceCount = computed(() => countSentences(this._content() ?? ''));
  readonly lineCount = computed(() => countLines(this._content() ?? ''));

  load(file: InputFile) {
    this._source.set({ kind: 'file', file });
  }

  fixAllPending() {
    const doc = this.linted();
    if (!doc) return;
    this.corrections.fixAll(doc.corrections.map(c => c.id));
  }
}
