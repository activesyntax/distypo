import { describe, it, expect } from 'vitest';
import { SegmentationService } from '@app/document-view/services/segmentation.service';
import { LintedDocument, Correction, CorrectionId } from '@core/domain/model';
import { interval } from '@core/utils';

it('should split document into segments', () => {
  const service = new SegmentationService();

  const corrections: readonly Correction[] = [
    { id: 'c1' as CorrectionId, range: interval(0, 4), replacement: 'That', original: "that" },
    { id: 'c2' as CorrectionId, range: interval(10, 14), replacement: 'sample', original: 'saMple' },
  ];

  const document: LintedDocument = {
    kind: 'linted',
    name: 'test.txt',
    content: 'This is a test document.',
    corrections,
  };

  const segments = service.split(document);

  expect(segments).toEqual([
    { kind: 'correction', correction: corrections[0], range: interval(0, 4) },
    { kind: 'text', text: ' is a ', range: interval(4, 10) },
    { kind: 'correction', correction: corrections[1], range: interval(10, 14) },
    { kind: 'text', text: ' document.', range: interval(14, 24) },
  ]);
});
