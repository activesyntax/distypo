import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrectionService } from '@app/correction-view/services/correction.service';

import { DocumentView } from '@app/document-view/document-view';
import { RenderedDocument } from '@app/view-model/rendered-document';
import { DocumentService } from './services/document.service';

describe('DocumentView', () => {
  let component: DocumentView;
  let fixture: ComponentFixture<DocumentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CorrectionService, RenderedDocument, DocumentService],
      imports: [DocumentView],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
