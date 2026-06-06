import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { InlineCorrectionView } from './inline-correction-view';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { Correction, CorrectionId } from '@core/domain/model';
import { interval } from '@utils/interval';
import { Config } from '@config/config';
import { createGuid } from '@utils/identity';
import { InlineCorrectionSegment } from '@app/view-model/segment';

function makeCorrection(id: string, start: number, end: number): Correction {
  return {
    id: id as CorrectionId,
    range: interval(start, end),
    original: 'original',
    replacement: 'replacement',
    hint: 'hint',
    ruleId: Config.rules[0].id,
  };
}

function makeInlineCorrectionSegment(
  corrections: Correction[],
  start: number,
  end: number
): InlineCorrectionSegment {
  return {
    id: createGuid("SegmentId"),
    kind: 'inline-correction',
    corrections,
    range: interval(start, end),
  };
}

describe('InlineCorrectionView', () => {
  let component: InlineCorrectionView;
  let fixture: ComponentFixture<InlineCorrectionView>;
  let componentRef: ComponentRef<InlineCorrectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineCorrectionView],
      providers: [
        {
          provide: CorrectionService,
          useValue: {
            statusOf: () => ({ kind: 'pending' }),
            reset: () => { },
          },
        },
        {
          useValue: {
            correctionText: () => 'mock context text',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineCorrectionView);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    const correction = makeCorrection('c1', 2, 5);
    const segment = makeInlineCorrectionSegment([correction], 0, 7);

    componentRef.setInput('segment', segment);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
