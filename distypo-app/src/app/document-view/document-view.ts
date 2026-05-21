import { httpResource } from '@angular/common/http';
import { Component, computed, effect, signal } from '@angular/core';
import { lint, LintedDocument, RawDocument } from '@core/index';

@Component({
  selector: 'app-document',
  imports: [],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  selected = signal<string | null>('noon');

  doc = httpResource.text(() => '/assets/data/demo.txt');
  #docLoaded = false;

  readonly rawDocument = computed<RawDocument>(() => {
    if (!this.doc.hasValue()) return { kind: 'raw', name: '', content: '' };
    return { kind: 'raw', name: 'demo.txt', content: this.doc.value() || '' };
  });

  readonly lintedDocument = computed<LintedDocument>(() => {
    return lint(this.rawDocument());
  });


  select(id: string) { this.selected.set(id); }
  keep(id: string) { /* az eredeti marad — issue feloldva */ }
  fix(id: string) { /* javasolt csere alkalmazása */ }
  edit(id: string) { /* inline szerkesztő megnyitása */ }
}
