import { WorkoutsService } from './../../services/workouts.service';
import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-show-exercise-workout',
  templateUrl: './show-exercise-workout.component.html',
  styleUrls: ['./show-exercise-workout.component.css']
})
export class ShowExerciseWorkoutComponent implements OnInit {
  countDown:Subscription;
  counter = 5;
  tick = 1000;
  public program: number;
  public day: number;
  public sequence: number;
  public currentExercise: WorkoutExercise;
  public workoutFinished = false;
  constructor(private route: ActivatedRoute, private service: WorkoutsService, private _router: Router) {}

  ngOnInit() {
    this.getElements()
  }

  getElements(){
    this.sequence = +this.route.snapshot.paramMap.get('program');
    this.day = +this.route.snapshot.paramMap.get('day');
   this.program = +this.route.snapshot.paramMap.get('program');

   this.service.getWorkoutExerciseByProgramDaySequence(this.day, this.program, this.sequence).subscribe(
     data =>
    this.currentExercise = data
   )
     this.service.getLastSequenceNumber(this.day, this.program)
       .subscribe(
         data =>
         data == this.currentExercise.sequence ? this.workoutFinished = true : false
       )

   }

   counterTimer(time_: number){
    this.counter = time_;
    this.countDown = timer(0, this.tick)
    .subscribe(data =>{
      if (this.counter == 0){
        this.countDown = null;
        this.getNext();
      } else {
      --this.counter;
      }
   });
   }

   getNext(){
     if (this.workoutFinished){
      this._router.navigate(['/workout-finished/' + this.day])
     } else {
      this._router.navigate(['/show-exercise-workout/' + this.program + '/' + this.day + '/' + this.sequence+1])
     }
  }


}
