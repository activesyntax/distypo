import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Workspace } from './workspace';
import { provideRouter } from '@angular/router';

describe('Workspace', () => {
  let component: Workspace;
  let fixture: ComponentFixture<Workspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workspace],
      providers: [provideRouter([])],
    })
      .overrideComponent(Workspace, {
        set: {
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
