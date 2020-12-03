import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
 // public exercises: Exercise[] = [];
//public translations: Translation[] = [];
  public exerciseTranslations: ExerciseTranslation[] = [];


  constructor(private service: ExerciseService, private _router: Router) { }

  ngOnInit() {
    this.service.getAllExercises().subscribe(data => {
      this.exerciseTranslations = data;
    })
  }

  deleteExercise(id: number){
    this.service.deleteExercise(id).subscribe(data => {
      this._router.navigate(["/exercises"])
    })
  }
}
