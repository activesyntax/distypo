import { computed, inject, Injectable } from '@angular/core';
import { Config } from '@config/config';
import { lint, LintedDocument } from '@core/index';
import { countWords, countSentences, countLines } from '@utils/text-stats';
import { ContentSourceStore } from './source/content-source-store';
import { rawDocument } from '@core/domain/raw-document';

@Injectable({ providedIn: 'root' })
export class DocumentState {
  private readonly sourceStore = inject(ContentSourceStore);

  readonly loading = this.sourceStore.loading;
  readonly error = this.sourceStore.error;

  readonly raw = computed(() => {
    const content = this.sourceStore.content();
    if (!content) return undefined;
    return rawDocument(content)
  });

  readonly linted = computed<LintedDocument | undefined>(() => {
    const rawDocument = this.raw();
    if (!rawDocument) return undefined;
    return lint(rawDocument, Config.rules);
  });

  readonly contentSizeBytes = computed(() => {
    const content = this.sourceStore.content();
    return content ? new TextEncoder().encode(content).length : 0;
  });

  readonly wordCount = computed(() => countWords(this.sourceStore.content() ?? ''));
  readonly sentenceCount = computed(() => countSentences(this.sourceStore.content() ?? ''));
  readonly lineCount = computed(() => countLines(this.sourceStore.content() ?? ''));


}
