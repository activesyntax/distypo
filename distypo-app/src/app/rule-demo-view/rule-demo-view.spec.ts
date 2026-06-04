import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDemoView } from './rule-demo-view';

describe('RuleDemoView', () => {
  let component: RuleDemoView;
  let fixture: ComponentFixture<RuleDemoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuleDemoView],
    }).compileComponents();

    fixture = TestBed.createComponent(RuleDemoView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
