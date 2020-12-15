import { CompletedExercise } from './../../interfaces/CompletedExercise';
import { UserService } from 'src/app/services/user.service';
import { WorkoutsService } from './../../services/workouts.service';
import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Subscription, Subject } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-show-exercise-workout',
  templateUrl: './show-exercise-workout.component.html',
  styleUrls: ['./show-exercise-workout.component.css']
})
export class ShowExerciseWorkoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<undefined>();
  tick = 1000;
  public program: number;
  public day: number;
  public sequence: number;
  public currentExercise: WorkoutExercise;
  public workoutFinished = false;
  public timer_s: number;
  interval;
  constructor(private route: ActivatedRoute, private service: WorkoutsService, private _router: Router, private userService: UserService) {

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(() => { try { clearInterval(this.interval); } catch { } this.getElements() })
  }
  ngOnDestroy(): void {
    try { clearInterval(this.interval); } catch { }
  }

  ngOnInit() {
  }

  getElements() {
    this.sequence = +Number(this.route.snapshot.paramMap.get('sequence'));
    this.day = +Number(this.route.snapshot.paramMap.get('day'));
    this.program = +Number(this.route.snapshot.paramMap.get('program'));
    this.service.getWorkoutExerciseByProgramDaySequence(this.day, this.program, this.sequence).subscribe(
      data => {
        this.currentExercise = data
        console.log(data)
        console.log(this.currentExercise.repeats)
        this.timer_s = Number(this.currentExercise.repeats);

        this.interval = setInterval(() => this.counterTimer(), 1000)

      });
    this.service.getLastSequenceNumber(this.day, this.program)
      .subscribe(
        data => {
          if (data == this.sequence) {
            this.workoutFinished = true
          } else { this.workoutFinished = false }
        });
  }

  counterTimer() {
    if (this.timer_s <= 0) {
      this.getNext();
      clearInterval(this.interval);
    } else {
      --this.timer_s;
    }
  }

  getNext() {
    this.timer_s = Number(this.currentExercise.repeats);
    if (this.workoutFinished) {
      var completed: CompletedExercise = new CompletedExercise(Number(localStorage.getItem('user_id')), this.day, this.program);
      this.userService.putCompletedExercise(completed).subscribe(data => {
        this._router.navigate(['/workout-finished/' + this.day])

      })
    } else {
      this.sequence += 1
      this._router.navigate(['/show-exercise-workout/' + this.program + '/' + this.day + '/' + this.sequence])

    }
  }


}
