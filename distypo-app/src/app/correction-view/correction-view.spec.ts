import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrectionView } from './correction-view';
import { provideCorrectionServiceMock } from './services/correction.service.mock';
import { provideSegmentationServiceMock } from '@app/document-view/services/segmentation.service.mock';

describe('CorrectionView', () => {
  let component: CorrectionView;
  let fixture: ComponentFixture<CorrectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectionView],
      providers: [provideCorrectionServiceMock(), provideSegmentationServiceMock()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
