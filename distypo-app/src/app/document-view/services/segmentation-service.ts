import { Injectable } from '@angular/core';
import { Correction, LintedDocument } from "@core/index";

export type Segment =
  | { kind: 'text'; text: string }
  | { kind: 'correction'; correction: Correction };

@Injectable()
export class SegmentationService {

  split(document: LintedDocument): Segment[] {

    // TODO: This is a naive implementation that doesn't handle overlapping
    // corrections or corrections that span multiple segments. A more robust
    // implementation would be needed for production use.
    const sortedCorrections = document.corrections.toSorted((a: Correction, b: Correction) => a.range.start - b.range.start);

    let lastIndex = 0;
    const segments: Segment[] = sortedCorrections.flatMap((correction): Segment[] => {
      const text = document.content.slice(lastIndex, correction.range.start);
      lastIndex = correction.range.end;
      return [
        { kind: 'text', text },
        { kind: 'correction', correction },
      ];
    })
      .concat(
        lastIndex < document.content.length
          ? [{ kind: 'text', text: document.content.slice(lastIndex) }]
          : [],
      );


    return segments;
  }
}

