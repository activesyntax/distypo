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

  readonly rawDocument: Signal<Result<RawDocument>> = computed(() => {
    return this.fileResource.hasValue()
      ? ok(RawDoc.from(this.inputFile.name, this.fileResource.value()))
      : err('Failed to load file');
  });

  readonly lintedDocument: Signal<Result<LintedDocument>> = computed(() => {
    return map(this.rawDocument(), lint);
  });

  select(id: string) { this.selected.set(id); }
  keep(id: string) { /* az eredeti marad — issue feloldva */ }
  fix(id: string) { /* javasolt csere alkalmazása */ }
  edit(id: string) { /* inline szerkesztő megnyitása */ }
}
