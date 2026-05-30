import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentInfo } from './document-info';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { RenderedDocument } from '@app/view-model/rendered-document';

describe('DocumentInfo', () => {
  let component: DocumentInfo;
  let fixture: ComponentFixture<DocumentInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CorrectionService, RenderedDocument],
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
