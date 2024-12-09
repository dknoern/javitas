import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStepOverrideComponent } from './next-step-override.component';

describe('NextStepOverrideComponent', () => {
  let component: NextStepOverrideComponent;
  let fixture: ComponentFixture<NextStepOverrideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextStepOverrideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextStepOverrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
