import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideDocumentStateMock } from '@app/state/document-state.mock';

import { DocumentInfo } from './document-info';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { RenderedDocument } from '@app/view-model/rendered-document';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DocumentInfo', () => {
  let component: DocumentInfo;
  let fixture: ComponentFixture<DocumentInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CorrectionService, RenderedDocument, provideDocumentStateMock()],
      imports: [DocumentInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
