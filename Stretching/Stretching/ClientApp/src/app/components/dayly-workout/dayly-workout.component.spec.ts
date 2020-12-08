import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaylyWorkoutComponent } from './dayly-workout.component';

describe('DaylyWorkoutComponent', () => {
  let component: DaylyWorkoutComponent;
  let fixture: ComponentFixture<DaylyWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaylyWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaylyWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
