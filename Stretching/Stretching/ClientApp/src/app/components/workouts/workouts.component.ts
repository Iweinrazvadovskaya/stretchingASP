import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutsService } from 'src/app/services/workouts.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public workouts: WorkoutNumber[] = [];

  constructor(private service: WorkoutsService, private _router: Router) { }

  ngOnInit() {
    this.service.getAllWorkouts().subscribe(data => {
      this.workouts = data;
    })
  }

}
