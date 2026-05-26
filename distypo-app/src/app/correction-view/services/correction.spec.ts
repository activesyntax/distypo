import { TestBed } from '@angular/core/testing';

import { Correction } from './correction';

describe('Correction', () => {
  let service: Correction;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Correction);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
