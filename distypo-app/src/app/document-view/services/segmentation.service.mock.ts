import { LintedDocument } from '@core/index';
import {
  CorrectionSegment,
  Segment,
  SegmentationService,
} from './segmentation.service';

/**
 * Test double for SegmentationService. Returns empty results by default so
 * components under test render an empty document without crashing.
 *
 * Override individual methods in specific tests when you need to supply
 * fixture segments or assert calls:
 *
 *   const svc = TestBed.inject(SegmentationService) as unknown as SegmentationServiceMock;
 *   svc.split = () => [{ kind: 'text', text: 'hello', range: interval(0, 5) }];
 */
export class SegmentationServiceMock implements Partial<SegmentationService> {
  split = (_document: LintedDocument): Segment[] => [];
  asText = (_segments: Segment[]): string => '';
  asDisplayText = (_segment: CorrectionSegment): string => '';
}

/** Drop-in providers entry for TestBed.configureTestingModule. */
export const provideSegmentationServiceMock = () => ({
  provide: SegmentationService,
  useClass: SegmentationServiceMock,
});
