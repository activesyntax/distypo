import { TestBed } from '@angular/core/testing';
import { CorrectionService } from './correction.service';

describe('CorrectionService', () => {
  let service: CorrectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrectionService],
    });
    service = TestBed.inject(CorrectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
