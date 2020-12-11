import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExerciseWorkoutComponent } from './show-exercise-workout.component';

describe('ShowExerciseWorkoutComponent', () => {
  let component: ShowExerciseWorkoutComponent;
  let fixture: ComponentFixture<ShowExerciseWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowExerciseWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExerciseWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
