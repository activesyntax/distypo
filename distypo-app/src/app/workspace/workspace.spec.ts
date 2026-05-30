import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Workspace } from './workspace';
import { provideDocumentStateMock } from '@app/state/document-state.mock';
import { provideCorrectionServiceMock } from '@app/correction-view/services/correction.service.mock';
import { provideRenderedDocumentMock } from '@app/view-model/rendered-document.mock';
import { DocumentService } from '@app/document-view/services/document.service';

describe('Workspace', () => {
  let component: Workspace;
  let fixture: ComponentFixture<Workspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workspace],
    })
      .overrideComponent(Workspace, {
        set: {
          providers: [
            provideDocumentStateMock(),
            provideCorrectionServiceMock(),
            provideRenderedDocumentMock(),
            DocumentService,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Workspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
