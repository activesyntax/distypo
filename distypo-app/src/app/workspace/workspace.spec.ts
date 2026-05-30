import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workspace } from './workspace';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentService } from '@app/document-view/services/document.service';
import { DocumentState } from '@app/state/document-state';
import { RenderedDocument } from '@app/view-model/rendered-document';

describe('Workspace', () => {
  let component: Workspace;
  let fixture: ComponentFixture<Workspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      providers: [RenderedDocument, DocumentService, CorrectionService, DocumentState],
      imports: [Workspace],
    }).compileComponents();

    fixture = TestBed.createComponent(Workspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
