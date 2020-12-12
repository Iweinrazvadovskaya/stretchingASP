import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  public workoutTranslationExercises: WorkoutExercise[] = [];
  router: any;

  constructor(private route: ActivatedRoute, private service: WorkoutsService, private _route: Router) {
    this.route.params.subscribe(data => {
      console.log(data);
    })
  }

  public day: number = 0;
  public program: number = 0;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.day = +this.route.snapshot.paramMap.get('day');
    this.program = +this.route.snapshot.paramMap.get('program');

    this.service.getWorkoutByProgramAndDay(this.day, this.program)
      .subscribe(data => this.workoutTranslationExercises = data);
  }

  edit(id: number, exId: number){
    this._route.navigate(['/add-exercise-in-workout/' + this.day + '/' + this.program + '/' + exId + '/1/' + id])
  }

  moveToAddPage(){
    let lastId = this.workoutTranslationExercises.length
    this._route.navigate(['/add-exercise-in-workout/' + this.day + '/' + this.program + '/' + lastId + '/0/0'])
  }
}
