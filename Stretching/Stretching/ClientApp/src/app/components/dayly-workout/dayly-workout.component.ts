import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dayly-workout',
  templateUrl: './dayly-workout.component.html',
  styleUrls: ['./dayly-workout.component.css']
})
export class DaylyWorkoutComponent implements OnInit {

  constructor() { }

  start = false;
  counter = 5;

  ngOnInit() {
  }

  startWorkout(){
    this.start = true;
  }

}
