import { ExerciseService } from 'src/app/services/exercise.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';
import { sequence } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-day',
  templateUrl: './new-day.component.html',
  styleUrls: ['./new-day.component.css']
})

export class NewDayComponent implements OnInit {

  public lastDay: number = 0;
  public program: number = 0;
  public exercisesNames: ExerciseNames[] = [];
  addExerciseForm: FormGroup;

  constructor(private route: ActivatedRoute, private exercisesService: ExerciseService, private service: WorkoutsService, private _route: Router) {
    this.route.params.subscribe(data => {
      console.log(data);
    });
  }
  ngOnInit() {
    this.getHero();

    this.addExerciseForm = new FormGroup({
      exercise_id: new FormControl(),
      repeats: new FormControl(),
      day: new FormControl(this.lastDay),
      sequence: new FormControl(),
      program_id: new FormControl(this.program)
    });
  }

  getHero(): void {
    this.lastDay = +this.route.snapshot.paramMap.get('lastDay');
    this.program = +this.route.snapshot.paramMap.get('program');

    this.exercisesService.getExercisesName().subscribe(data =>
      this.exercisesNames = data
      );
    // this.service.getWorkoutByProgramAndDay(this.day, this.program)
    //   .subscribe(data => this.workoutTranslationExercises = data);
  }

}
