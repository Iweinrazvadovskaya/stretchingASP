import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { WorkoutsService } from 'src/app/services/workouts.service';

@Component({
  selector: 'app-dayly-workout',
  templateUrl: './dayly-workout.component.html',
  styleUrls: ['./dayly-workout.component.css']
})
export class DaylyWorkoutComponent implements OnInit, OnDestroy {

  // countDown: Subscription;
  // counter = 5;
  // tick = 1000;
  // start = false;
  // viewStartpage = true;
  // showExercise = true;
  // public day: number = 1;
  // public program: number = 1;
  // public workoutTranslationExercises: WorkoutExercise[] = [];
  // public currentExercise: WorkoutExercise= new this.workoutTranslationExercises()

  // ngOnInit() {
  //   this.getElements()
  // }

  // getElements(){
  //  // this.day = +this.route.snapshot.paramMap.get('day');
  // // this.program = +this.route.snapshot.paramMap.get('program');

  //   this.service.getWorkoutByProgramAndDay(this.day, this.program)
  //     .subscribe(data =>
  //       this.workoutTranslationExercises = data);
  // }

  // constructor(private route: ActivatedRoute, private service: WorkoutsService, private _route: Router) { 
  //   this.currentExercise
  // }

  // startWorkout(){
  //   this.start = true;
  //   this.viewStartpage = false;
  //   this.counterTimer(5);
  // }

  // counterTimer(time_: number){
  //   this.counter = time_;
  //   this.countDown = timer(0, this.tick)
  //   .subscribe(data =>{
  //     if (this.counter == 0){
  //       this.getNext();
  //     } else {
  //     --this.counter;
  //     console.log(this.counter)
  //     }
  //  });
  // }

  // getNext(){
  //   // this.start = false;
  //   // this.showExercise = true;
  //   // console.log(this.workoutTranslationExercises)
  //   // this.currentExercise = null;
  //   // this.currentExercise = this.workoutTranslationExercises[0];
  //   // this.counterTimer(Number(this.currentExercise.time));
  //   // this.workoutTranslationExercises.splice(0, 1);
  //   this._route.navigate(['/show-exercise-workout/' + this.workoutTranslationExercises[0].program_id + '/' + this.workoutTranslationExercises[0].day + '/' + this.workoutTranslationExercises[0].sequence])
  // }

  // ngOnDestroy(){
  //   this.countDown=null;
  // }

  timeToStartWorkout = 5;
  dayOfWorkout=4;
  isWorkoutStart:boolean=false;
  countDown: Subscription;

  program=0;
  day=0;
  sequence=0;

  constructor(private route:Router){

  }
  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.countDown.unsubscribe()
  }
  startWorkout() {
    this.isWorkoutStart=true;
    this.setTimeToStartWorkouot(5)
  }
  setTimeToStartWorkouot(time: number){
    this.timeToStartWorkout = time;
    this.countDown = timer(0, 1000)
    .subscribe(data =>{
      if (this.timeToStartWorkout == 0){
        this.route.navigate([`/show-exercise-workout/${this.program}/${this.day}/${this.sequence}`]);
      } else {
      --this.timeToStartWorkout;
      }
    });
  }


}
