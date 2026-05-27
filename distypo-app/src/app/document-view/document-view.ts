import { httpResource } from '@angular/common/http';
import { Component, computed, effect, signal } from '@angular/core';
import { lint, LintedDocument } from '@core/index';
import * as RawDoc from '@core/domain/raw-document';
import { Config } from "@config/config";
import { CorrectionView } from '@app/correction-view/correction-view';
import { Segment, SegmentationService } from './services/segmentation-service';
import { CorrectionService } from '@app/correction-view/services/correction.service';


type InputFile = { name: string; path: string };

@Component({
  selector: 'app-document',
  imports: [CorrectionView],
  providers: [SegmentationService, CorrectionService],
  templateUrl: './document-view.html',
  styleUrl: './document-view.scss',
})
export class DocumentView {

  constructor(private segmentation: SegmentationService, private correctionService: CorrectionService) { }

  private initialSelectionApplied = false;

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

  readonly lintedDocument = computed<LintedDocument | undefined>(() => {
    if (this.fileResource.status() !== 'resolved') return undefined;

    const file = this.fileResource.value();
    if (!file) return undefined;

    const rawDocument = RawDoc.from(this.inputFile.name, file);
    const lintedDocument = lint(rawDocument, Config.rules);

    return lintedDocument;
  });

  readonly segments = computed<Segment[]>(() => {
    const doc = this.lintedDocument();
    return doc ? this.segmentation.split(doc) : [];
  });
}

