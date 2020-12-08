import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.css']
})
export class ListExercisesComponent implements OnInit {

  public exercises: ExerciseTranslation[] = [];

  constructor(private service: ExerciseService, private _router: Router) { }

  ngOnInit() {
    this.service.getAllExercises().subscribe(data => {
      this.exercises = data;
    });
  }

  goToExercise(exercise_id: number){
    this._router.navigate(['/show-exercise/' + exercise_id]);
  }
}
