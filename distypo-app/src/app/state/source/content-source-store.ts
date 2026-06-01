import { httpResource } from "@angular/common/http";
import { Injectable, signal, computed, Signal } from "@angular/core";
import { InputFile } from "@core/index";
import { ContentSource, defaultSource, toFileUrl } from "./content-source";

@Injectable({ providedIn: 'root' })
export class ContentSourceStore {
  private readonly _source = signal<ContentSource>(defaultSource());

  readonly source = this._source.asReadonly();

  private readonly fileResource = httpResource.text(() =>
    toFileUrl(this._source())
  );

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

  setFile(file: InputFile) {
    this._source.set({ kind: 'file', file });
  }

  setText(text: string) {
    this._source.set({ kind: 'text', text });
  }
}
