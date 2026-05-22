import { httpResource } from '@angular/common/http';
import { Component, computed, effect, Input, Signal, signal } from '@angular/core';
import { lint, LintedDocument, RawDocument } from '@core/index';
import * as RawDoc from '@core/domain/raw-document';
import { err, map, ok, Result } from '@core/fp';

type InputFile = { name: string; path: string };

@Component({
  selector: 'app-document',
  imports: [],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  selected = signal<string | null>('noon');

  readonly inputFile: InputFile = { name: 'demo.txt', path: '/assets/data/demo.txt' };

  private readonly fileResource = httpResource.text(() => this.inputFile.path);

  readonly lintedDocument: Signal<Result<LintedDocument>> = computed(() => {

    const file = this.fileResource.value();
    return file ? ok(lint(RawDoc.from(this.inputFile.name, file))) : err('Failed to load file');
  });

  readonly lintLoading = computed(() =>
    this.fileResource.status() === 'loading'
  );

  readonly lintError = computed(() =>
    this.fileResource.status() === 'error'
      ? this.fileResource.error()
      : null
  );

  readonly lintValue = computed<LintedDocument | null>(() => {
    if (this.fileResource.status() !== 'resolved') return null;

    const file = this.fileResource.value();
    if (!file) return null;

    const raw = RawDoc.from(this.inputFile.name, file);
    return lint(raw);
  });

  select(id: string) { this.selected.set(id); }
  keep(id: string) { /* az eredeti marad — issue feloldva */ }
  fix(id: string) { /* javasolt csere alkalmazása */ }
  edit(id: string) { /* inline szerkesztő megnyitása */ }
}
