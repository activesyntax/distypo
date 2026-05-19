import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentInfo } from './document-info';

describe('DocumentInfo', () => {
  let component: DocumentInfo;
  let fixture: ComponentFixture<DocumentInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
