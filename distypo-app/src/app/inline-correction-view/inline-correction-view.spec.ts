import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCorrectionView } from './inline-correction-view';

describe('InlineCorrectionView', () => {
  let component: InlineCorrectionView;
  let fixture: ComponentFixture<InlineCorrectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineCorrectionView],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineCorrectionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
