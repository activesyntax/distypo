import { CorrectionSegment, Segment } from './segments';
import { RenderedDocument } from './rendered-document';
import { LintedDocument } from '@core/index';

export class RenderedDocumentMock implements Partial<RenderedDocument> {
  split = (_doc: LintedDocument): Segment[] => [];
  asText = (_segments: Segment[]): string => '';
  displayText = (seg: CorrectionSegment): string => seg.context.original;
}

export const provideRenderedDocumentMock = () => ({
  provide: RenderedDocument,
  useClass: RenderedDocumentMock,
});
