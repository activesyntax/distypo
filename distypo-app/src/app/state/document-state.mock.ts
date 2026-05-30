import { signal } from '@angular/core';
import { LintedDocument } from '@core/index';
import { DocumentState } from './document-state';

type InputFile = { name: string; path: string };

export class DocumentStateMock implements Partial<DocumentState> {
  private readonly _inputFile = signal<InputFile>({ name: 'test.txt', path: '/test' });
  private readonly _content = signal('');
  private readonly _linted = signal<LintedDocument | undefined>(undefined);

  readonly inputFile = this._inputFile.asReadonly();
  readonly content = this._content.asReadonly();
  readonly linted = this._linted.asReadonly();

  readonly loading = signal(false).asReadonly();
  readonly error = signal<string | undefined>(undefined).asReadonly();

  readonly contentSizeBytes = signal(0).asReadonly();
  readonly wordCount = signal(0).asReadonly();
  readonly sentenceCount = signal(0).asReadonly();
  readonly lineCount = signal(0).asReadonly();

  load = (_file: InputFile): void => { };
}

export const provideDocumentStateMock = () => ({
  provide: DocumentState,
  useClass: DocumentStateMock,
});
