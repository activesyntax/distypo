import { TestBed } from '@angular/core/testing';

import { RenderedDocument } from './rendered-document';

describe('RenderedDocument', () => {
  let service: RenderedDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderedDocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
