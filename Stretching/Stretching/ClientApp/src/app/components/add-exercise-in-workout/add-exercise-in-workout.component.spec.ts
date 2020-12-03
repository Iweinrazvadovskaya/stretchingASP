import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseInWorkoutComponent } from './add-exercise-in-workout.component';

describe('AddExerciseInWorkoutComponent', () => {
  let component: AddExerciseInWorkoutComponent;
  let fixture: ComponentFixture<AddExerciseInWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExerciseInWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseInWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
