import { TestBed } from '@angular/core/testing';

import { DocumentState } from './document-state';
import { CorrectionService } from '@app/correction-view/services/correction.service';

describe('DocumentState', () => {
  let service: DocumentState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrectionService],
    });
    service = TestBed.inject(DocumentState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
