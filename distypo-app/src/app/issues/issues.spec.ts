import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Issues } from './issues';
import { CorrectionService } from '@app/correction-view/services/correction.service';

describe('Issues', () => {
  let component: Issues;
  let fixture: ComponentFixture<Issues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CorrectionService],
      imports: [Issues],
    }).compileComponents();

    fixture = TestBed.createComponent(Issues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
