import { TestBed } from '@angular/core/testing';
import { RenderedDocument } from './rendered-document';
import { CorrectionService } from '@app/correction-view/services/correction.service';

describe('RenderedDocument', () => {
  let service: RenderedDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderedDocument, CorrectionService],
      // providers: [RenderedDocument, provideCorrectionServiceMock()],
    });
    service = TestBed.inject(RenderedDocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
