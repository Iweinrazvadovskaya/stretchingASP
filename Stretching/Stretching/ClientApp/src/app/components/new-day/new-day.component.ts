import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from 'src/app/services/workouts.service';

@Component({
  selector: 'app-new-day',
  templateUrl: './new-day.component.html',
  styleUrls: ['./new-day.component.css']
})
export class NewDayComponent implements OnInit {

  public lastDay: number = 0;
  public program: number = 0;

  constructor(private route: ActivatedRoute, private service: WorkoutsService, private _route: Router) {
    this.route.params.subscribe(data => {
      console.log(data);
    })
  }
  ngOnInit() {
    this.getHero();

  }

  getHero(): void {
    this.lastDay = +this.route.snapshot.paramMap.get('lastDay');
    this.program = +this.route.snapshot.paramMap.get('program');

    // this.service.getWorkoutByProgramAndDay(this.day, this.program)
    //   .subscribe(data => this.workoutTranslationExercises = data);
  }

}
