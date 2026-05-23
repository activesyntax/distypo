import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionView } from './correction-view';

describe('CorrectionView', () => {
  let component: CorrectionView;
  let fixture: ComponentFixture<CorrectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectionView],
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
