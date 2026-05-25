import { describe, it, expect } from 'vitest';
import { SegmentationService } from '@app/document-view/services/segmentation-service';
import { LintedDocument, Correction, CorrectionId } from '@core/domain/model';
import { TextRange } from '@core/domain/text-range';

// Small helpers to build branded values in tests without ceremony
const range = (start: number, end: number): TextRange =>
  ({ start, end, __brand: 'TextRange' } as TextRange);

const correctionId = (s: string) => s as CorrectionId;

it('should split document into segments', () => {
  const service = new SegmentationService();

  const corrections: readonly Correction[] = [
    { id: correctionId('c1'), range: range(0, 4), replacement: 'That' },
    { id: correctionId('c2'), range: range(10, 14), replacement: 'sample' },
  ];

  const document: LintedDocument = {
    kind: 'linted',
    name: 'test.txt',
    content: 'This is a test document.',
    //        0123456789012345678901234
    //        0         1         2
    corrections,
  };

  const segments = service.split(document);

  expect(segments).toEqual([
    { kind: 'correction', correction: corrections[0], range: [0, 4] },
    { kind: 'text', text: ' is a ', range: [4, 10] },
    { kind: 'correction', correction: corrections[1], range: [10, 14] },
    { kind: 'text', text: ' document.', range: [14, 24] },
  ]);
});

