import { TestBed } from '@angular/core/testing';

import { DocumentState } from './document-state';

describe('DocumentState', () => {
  let service: DocumentState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
