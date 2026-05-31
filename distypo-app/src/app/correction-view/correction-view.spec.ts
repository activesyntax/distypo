import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrectionView } from './correction-view';
import { provideCorrectionServiceMock } from './services/correction.service.mock';
import { interval } from '@utils/interval';
import { CorrectionSegment } from '@app/view-model/segments';

describe('CorrectionView', () => {
  let fixture: ComponentFixture<CorrectionView>;
  let component: CorrectionView;

  const fakeSegment: CorrectionSegment = {
    kind: 'correction',
    correction: {
      id: 'c1' as any, // CorrectionId is a branded string; cast for test
      range: interval(0, 5),
      replacement: 'Hello',
      // add whatever other Correction fields your domain requires
    } as any,
    range: interval(0, 5),
    context: {
      originalRange: interval(0, 5),
      original: 'hello',
      replacement: 'Hello',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectionView],
      providers: [
        provideCorrectionServiceMock(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectionView);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('segment', fakeSegment);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
