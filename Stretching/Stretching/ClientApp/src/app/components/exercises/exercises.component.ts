import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
  constructor(private service: ExerciseService) { }

  ngOnInit() {
    this.service.getAllExercises().subscribe(data => {
      this.exerciseTranslations = data;
    })

    // this.service.getAllExercises().subscribe(data => {
    //   this.exercises = data;
    // })

    // if(this.exercises.length > 0 && this.translations.length > 0){
    //  }
  }

}
