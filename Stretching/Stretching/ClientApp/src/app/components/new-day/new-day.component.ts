import { WorkoutDayDto } from './../../interfaces/WorkoutDayDto';
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

  constructor(private route: ActivatedRoute, private exercisesService: ExerciseService, private service: WorkoutsService, private _route: Router) {
    this.route.params.subscribe(data => {
      console.log(data);
    });

    this.workoutDayDtoData.push(new WorkoutDayDto('', 0, 0 , 0, 0));
  }

  public lastDay = 0;
  public program = 0;
  public exercisesNames: ExerciseNames[] = [];
  // addExerciseForm: FormGroup;
  // exerciseFormArray: FormGroup[] = [];


  sequences = [0];
  elementNumber = 0;

  workoutDayDtoData: Array<WorkoutDayDto> = [];

  ngOnInit() {
    this.getHero();

    this.workoutDayDtoData[0].day = this.lastDay;
    this.workoutDayDtoData[0].program_id = this.program;
  }

  getHero(): void {
    this.lastDay = +this.route.snapshot.paramMap.get('lastDay') + 1;
    this.program = +this.route.snapshot.paramMap.get('program');

    this.exercisesService.getExercisesName().subscribe(data =>
      this.exercisesNames = data
      );
    // this.service.getWorkoutByProgramAndDay(this.day, this.program)
    //   .subscribe(data => this.workoutTranslationExercises = data);
  }

  add(): void {
    this.workoutDayDtoData[this.elementNumber].sequence = this.elementNumber + 1;
    console.log(this.workoutDayDtoData[this.elementNumber]);

    this.elementNumber ++;
    this.sequences.push(this.elementNumber);
    // this.workoutDayDtoData[this.elementNumber].day = day;
    // this.workoutDayDtoData[this.elementNumber].program_id = this.program;

    this.workoutDayDtoData.push(new WorkoutDayDto('', 0, this.program, 0 ,  this.lastDay));
  }

  pushData() {
    this.workoutDayDtoData.forEach(element => {
        element.exercise_id =  Number(element.exercise_id);
    });
    this.workoutDayDtoData[this.elementNumber].sequence = this.elementNumber + 1;

    console.log(this.workoutDayDtoData);

    this.service.addWorkoutDay(this.workoutDayDtoData).subscribe(data =>
      this._route.navigate(["/workouts"])
      )
  }

}
