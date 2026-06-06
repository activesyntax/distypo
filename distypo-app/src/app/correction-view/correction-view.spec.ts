import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrectionView } from './correction-view';
import { provideCorrectionServiceMock } from './services/correction.service.mock';
import { interval } from '@utils/interval';
import { CorrectionSegment, SegmentId } from '@app/view-model/segment';
import { CorrectionId } from '@core/domain/model';

describe('CorrectionView', () => {
  let fixture: ComponentFixture<CorrectionView>;
  let component: CorrectionView;

  const fakeSegment: CorrectionSegment = {
    id: 's1' as SegmentId,
    kind: 'correction',
    correction: {
      id: 'c1' as CorrectionId,
      range: interval(0, 5),
      replacement: 'Hello',
      source: 'llm-suggestion',
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
