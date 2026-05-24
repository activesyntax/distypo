import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'correction'; correction: Correction };

@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    const sortedCorrections = document.corrections.toSorted((a: Correction, b: Correction) => a.range.start - b.range.start);

    const segments: Segment[] = [];

    return segments;
  }
}

