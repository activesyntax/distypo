import { computed, inject, Injectable } from '@angular/core';
import { lint, LintedDocument, polish, PolishedDocument } from '@core/index';
import { countWords, countSentences, countLines } from '@utils/text-stats';
import { ContentSourceStore } from './source/content-source-store';
import { rawDocument } from '@core/domain/raw-document';
import { RuleService } from '@app/config/rule.service';
import { CorrectionSegmentResolver } from './segments.service';
import { toSegments } from '@app/view-model/segment-operations';

@Injectable({ providedIn: 'root' })
export class DocumentState {
  private readonly sourceStore = inject(ContentSourceStore);
  private readonly rules = inject(RuleService);
  private readonly segmentService = inject(CorrectionSegmentResolver);

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

    return lint(rawDocument, this.rules.activeRules());
  });

  readonly polished = computed<PolishedDocument | undefined>(() => {
    const lintedDocument = this.linted();
    if (!lintedDocument) return undefined;

    const plainText = this.segmentService.asPlainText(lintedDocument, this.segments());
    return polish(plainText);
  });


  readonly segments = computed(() => {
    const doc = this.linted();
    return doc ? toSegments(doc) : [];
  });


  readonly contentSizeBytes = computed(() => {
    const content = this.sourceStore.content();
    return content ? new TextEncoder().encode(content).length : 0;
  });

  readonly wordCount = computed(() => countWords(this.sourceStore.content() ?? ''));
  readonly sentenceCount = computed(() => countSentences(this.sourceStore.content() ?? ''));
  readonly lineCount = computed(() => countLines(this.sourceStore.content() ?? ''));


}
