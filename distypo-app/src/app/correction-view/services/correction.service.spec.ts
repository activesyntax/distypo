import { TestBed } from '@angular/core/testing';
import { CorrectionService } from './correction';


describe('CorrectionService', () => {
  let service: CorrectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
