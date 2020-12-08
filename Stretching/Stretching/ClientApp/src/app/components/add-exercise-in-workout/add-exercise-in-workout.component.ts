import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutsService } from 'src/app/services/workouts.service';

@Component({
  selector: 'app-add-exercise-in-workout',
  templateUrl: './add-exercise-in-workout.component.html',
  styleUrls: ['./add-exercise-in-workout.component.css']
})
export class AddExerciseInWorkoutComponent implements OnInit {

  public workoutTranslationExercises: WorkoutExercise = null;
  public exercisesNames: ExerciseNames[] = []

  public day: number = 0;
  public program: number = 0;
  lastId: number = 0;
  addExerciseForm: FormGroup;
  selectedExercise: number;

  constructor( private route: ActivatedRoute,  private service: WorkoutsService, private _route: Router, private exercisesService: ExerciseService) {
    this.route.params.subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
    this.getHero();

    this.addExerciseForm = new FormGroup({
      exercise_id: new FormControl(),
      repeats: new FormControl(),
      day: new FormControl(this.day),
      sequence: new FormControl(this.lastId + 1),
      program_id: new FormControl(this.program)
    });
}

  add(){
  console.log(this.addExerciseForm.value.exercise_id)
    this.addExerciseForm.value.exercise_id = Number(this.addExerciseForm.value.exercise_id)

    this.service.addExerciseInWorkout(this.addExerciseForm.value).subscribe(data => {
      this._route.navigate(["/workout/" + this.program + "/" + this.day])
    },
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () =>
      console.log("good") );
  }

  selectOption(id: number) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.selectedExercise)
  }

  getHero(): void {
    this.day = +this.route.snapshot.paramMap.get('day');
    this.program = +this.route.snapshot.paramMap.get('program');
    this.lastId = +this.route.snapshot.paramMap.get('lastId');

    this.exercisesService.getExercisesName().subscribe(data =>
       this.exercisesNames = data
       );
  }
}
