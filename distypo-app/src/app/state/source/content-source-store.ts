import { httpResource } from "@angular/common/http";
import { Injectable, signal, computed, Signal } from "@angular/core";
import { ContentSource, emptySource } from "./content-source";

@Injectable({ providedIn: 'root' })
export class ContentSourceStore {
  private readonly _source = signal<ContentSource>(emptySource());

  readonly draftText = signal('');
  readonly source = this._source.asReadonly();


  readonly content = computed<string | undefined>(() => {
    const src = this._source();
    if (src.kind === 'text') return src.text;
    return this.fileResource.value() ?? undefined;
  });

  readonly loading = computed(() =>
    this._source().kind === 'file' && this.fileResource.status() === 'loading'
  );

  readonly error: Signal<string | undefined> = computed(() =>
    this._source().kind === 'file' && this.fileResource.status() === 'error'
      ? 'Failed to load document.'
      : undefined
  );

  private readonly fileResource = httpResource.text(() => {
    const src = this.source();
    return src.kind === 'file' ? src.path : undefined;
  });

  setText(text: string) {
    this._source.set({ kind: 'text', text });
  }
}
