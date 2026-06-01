import { computed, inject, Injectable } from '@angular/core';
import { Config } from '@config/config';
import { lint, LintedDocument } from '@core/index';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { countWords, countSentences, countLines } from '@utils/text-stats';
import { ContentSourceStore } from './source/content-source-store';
import { rawDocument } from '@core/domain/raw-document';

@Injectable({ providedIn: 'root' })
export class DocumentState {
  private readonly corrections = inject(CorrectionService);
  private readonly sourceStore = inject(ContentSourceStore);

  readonly loading = this.sourceStore.loading;
  readonly error = this.sourceStore.error;

  readonly linted = computed<LintedDocument | undefined>(() => {
    const content = this.sourceStore.content();
    if (!content) return undefined;
    return lint(rawDocument(content), Config.rules);
  });

  readonly contentSizeBytes = computed(() => {
    const content = this.sourceStore.content();
    return content ? new TextEncoder().encode(content).length : 0;
  });

  readonly wordCount = computed(() => countWords(this.sourceStore.content() ?? ''));
  readonly sentenceCount = computed(() => countSentences(this.sourceStore.content() ?? ''));
  readonly lineCount = computed(() => countLines(this.sourceStore.content() ?? ''));

  // TODO: find better location
  fixAllPending() {
    const doc = this.linted();
    if (!doc) return;
    this.corrections.fixAll(doc.corrections.map(c => c.id));
  }
}
