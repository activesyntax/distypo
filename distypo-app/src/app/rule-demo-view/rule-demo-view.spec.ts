import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDemoView } from './rule-demo-view';
import { ComponentRef } from '@angular/core';

describe('RuleDemoView', () => {
  let component: RuleDemoView;
  let fixture: ComponentFixture<RuleDemoView>;
  let componentRef: ComponentRef<RuleDemoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleDemoView],
    }).compileComponents();

    fixture = TestBed.createComponent(RuleDemoView);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('original', "original");
    componentRef.setInput('replacement', "replacement");
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
