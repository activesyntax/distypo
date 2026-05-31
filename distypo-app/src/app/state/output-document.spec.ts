import { TestBed } from '@angular/core/testing';

import { OutputDocument } from './output-document';

describe('OutputDocument', () => {
  let service: OutputDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputDocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
