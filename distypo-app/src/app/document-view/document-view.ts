import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { lint, } from '@core/index';
import * as RawDoc from '@core/domain/raw-document';
import { SafeHtmlService } from '@app/document-view/services/safe-html.service';
import { SafeHtml } from '@angular/platform-browser';


type InputFile = { name: string; path: string };

@Component({
  selector: 'app-document',
  imports: [],
  providers: [SafeHtmlService],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {
  selected = signal<string | null>('noon');

  readonly inputFile: InputFile = { name: 'demo.txt', path: '/assets/data/demo.txt' };


  private readonly fileResource = httpResource.text(() => this.inputFile.path);

  readonly documentLoading = computed(() =>
    this.fileResource.status() === 'loading'
  );

  readonly documentError = computed(() =>
    this.fileResource.status() === 'error'
      ? "Failed to load document."
      : undefined
  );

  readonly documentHTML = computed<SafeHtml | undefined>(() => {
    if (this.fileResource.status() !== 'resolved') return undefined;

    const file = this.fileResource.value();
    if (!file) return undefined;

    const rawDocument = RawDoc.from(this.inputFile.name, file);
    const lintedDocument = lint(rawDocument);
    const html = this.safeHtml.from(lintedDocument.content);
    return html;
  });

  constructor(private safeHtml: SafeHtmlService) {
  }

  select(id: string) { this.selected.set(id); }
  keep(id: string) { /* az eredeti marad — issue feloldva */ }
  fix(id: string) { /* javasolt csere alkalmazása */ }
  edit(id: string) { /* inline szerkesztő megnyitása */ }
}

