import { httpResource } from '@angular/common/http';
import { Component, computed, effect, signal } from '@angular/core';
import { lint, LintedDocument, RawDocument } from '@core/index';
import * as RawDoc from '@core/domain/raw-document';

@Component({
  selector: 'app-document',
  imports: [],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  selected = signal<string | null>('noon');

  readonly inputDocument = { name: 'demo.txt', path: '/assets/data/demo.txt' };

  readonly document = httpResource.text(() => this.inputDocument.path);

  readonly rawDocument = computed<RawDocument>(() => {
    const content = this.document.value();
    return content === undefined
      ? RawDoc.empty(this.inputDocument.name)
      : RawDoc.fromContent(this.inputDocument.name, content);
  });

  readonly lintedDocument = computed<LintedDocument>(() => {
    return lint(this.rawDocument());
  });


  select(id: string) { this.selected.set(id); }
  keep(id: string) { /* az eredeti marad — issue feloldva */ }
  fix(id: string) { /* javasolt csere alkalmazása */ }
  edit(id: string) { /* inline szerkesztő megnyitása */ }
}
