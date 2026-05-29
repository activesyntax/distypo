import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { CorrectionSegment, SegmentationService } from '@app/document-view/services/segmentation.service';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { LintedDocument, Correction, CorrectionId } from '@core/domain/model';
import { interval } from '@core/utils';

describe('SegmentationService', () => {
  let service: SegmentationService;
  let correctionService: CorrectionService;

  // Reused fixture: "This is a test document."
  //                  0123456789012345678901234
  //                  ^^^^      ^^^^
  //                  c1 (0-4)  c2 (10-14)
  const c1: Correction = {
    id: 'c1' as CorrectionId,
    range: interval(0, 4),
    replacement: 'That',
    original: 'This',
  };
  const c2: Correction = {
    id: 'c2' as CorrectionId,
    range: interval(10, 14),
    replacement: 'sample',
    original: 'test',
  };

  const doc: LintedDocument = {
    kind: 'linted',
    name: 'test.txt',
    content: 'This is a test document.',
    corrections: [c1, c2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentationService, CorrectionService],
    });
    service = TestBed.inject(SegmentationService);
    correctionService = TestBed.inject(CorrectionService);
  });

  describe('split', () => {
    it('produces correction segments with whitespace-padded context', () => {
      const segments = service.split(doc);

      const c1Seg = segments.find(
        s => s.kind === 'correction' && s.correction.id === ('c1' as CorrectionId)
      );
      expect(c1Seg).toEqual({
        kind: 'correction',
        correction: c1,
        range: interval(0, 4),
        context: {
          // No whitespace before position 0, so context extends to start of string.
          // Whitespace after "This" is at position 4, so context ends there.
          originalRange: interval(0, 4),
          original: 'This',
          replacement: 'That',
        },
      });

      const c2Seg = segments.find(
        s => s.kind === 'correction' && s.correction.id === ('c2' as CorrectionId)
      );
      expect(c2Seg).toEqual({
        kind: 'correction',
        correction: c2,
        range: interval(10, 14),
        context: {
          // Whitespace before "test" at position 9, so context starts at 10.
          // Whitespace after "test" at position 14, so context ends there.
          originalRange: interval(10, 14),
          original: 'test',
          replacement: 'sample',
        },
      });
    });

    it('fills the gaps between corrections with text segments', () => {
      const segments = service.split(doc);

      const textSegments = segments.filter(s => s.kind === 'text');

      // Gaps = complement of [0,4] and [10,14] within [0,24]
      // = [4,10] and [14,24]
      expect(textSegments).toEqual([
        { kind: 'text', text: ' is a ', range: interval(4, 10) },
        { kind: 'text', text: ' document.', range: interval(14, 24) },
      ]);
    });

    it('returns segments sorted by range start', () => {
      const segments = service.split(doc);

      const starts = segments.map(s => s.range.start);
      expect(starts).toEqual([...starts].sort((a, b) => a - b));
    });

    it('returns a single text segment for a document with no corrections', () => {
      const plain: LintedDocument = {
        kind: 'linted',
        name: 'plain.txt',
        content: 'Hello world.',
        corrections: [],
      };

      expect(service.split(plain)).toEqual([
        { kind: 'text', text: 'Hello world.', range: interval(0, 12) },
      ]);
    });
  });

  describe('asDisplayText', () => {
    it('returns the original text when the correction is pending', () => {
      const segments = service.split(doc);
      const c1Seg = segments.find(s => s.kind === 'correction')!;

      // Default status is pending — no setup needed.
      expect(service.asDisplayText(c1Seg)).toBe('This');
    });

    it('returns the original text when the correction is kept', () => {
      correctionService.keep('c1' as CorrectionId);
      const segments = service.split(doc);
      const c1Seg: CorrectionSegment = segments.find(
        (s): s is CorrectionSegment =>
          s.kind === 'correction' && s.correction.id === ('c1' as CorrectionId)
      )!;

      expect(service.asDisplayText(c1Seg)).toBe('This');
    });

    it('returns the replacement text when the correction is fixed', () => {
      correctionService.fix('c1' as CorrectionId);
      const segments = service.split(doc);
      const c1Seg = segments.find(
        (s): s is CorrectionSegment =>
          s.kind === 'correction' && s.correction.id === ('c1' as CorrectionId)
      )!;

      expect(service.asDisplayText(c1Seg)).toBe('That');
    });

    it('returns the custom replacement when the correction was edited', () => {
      correctionService.commitEdit('c1' as CorrectionId, 'Those');
      const segments = service.split(doc);
      const c1Seg = segments.find(
        (s): s is CorrectionSegment =>
          s.kind === 'correction' && s.correction.id === ('c1' as CorrectionId)
      )!;

      expect(service.asDisplayText(c1Seg)).toBe('Those');
    });
  });

  describe('asText', () => {
    it('reconstructs the original document when all corrections are pending', () => {
      const segments = service.split(doc);
      expect(service.asText(segments)).toBe('This is a test document.');
    });

    it('uses replacements for fixed corrections', () => {
      correctionService.fix('c1' as CorrectionId);
      correctionService.fix('c2' as CorrectionId);
      const segments = service.split(doc);

      expect(service.asText(segments)).toBe('That is a sample document.');
    });

    it('mixes original and replacement based on per-correction status', () => {
      correctionService.fix('c1' as CorrectionId); // accept
      correctionService.keep('c2' as CorrectionId); // reject
      const segments = service.split(doc);

      expect(service.asText(segments)).toBe('That is a test document.');
    });

    it('uses custom replacements from edits', () => {
      correctionService.commitEdit('c2' as CorrectionId, 'sample-edited');
      const segments = service.split(doc);

      expect(service.asText(segments)).toBe('This is a sample-edited document.');
    });
  });
});
