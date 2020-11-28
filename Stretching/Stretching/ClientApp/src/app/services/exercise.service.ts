import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest, mergeMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  _baseURL: string = "api/exercises";
  _languageURL: string = "api/exercisetranslations"

  constructor(private http: HttpClient) { }

  getAllExercises() {
    return this.http.get<ExerciseTranslation[]>(this._baseURL)
  }

  addExercise(exercise: Exercise) {
    return this.http.post(this._baseURL, exercise);
  }

  addTranslation(translation: Translation) {

    //var ex: Exercise = new Exercise(exercise.id, exercise.preview, exercise.video_url, exercise.short_name);
    //  var tr: Translation = new Translation(exercise.id + 10000, exercise.name, exercise.description, 10, exercise.lang);
    return this.http.post(this._languageURL, translation);
  }
  // getExercise(id: number){
  //   return this.getAllExercises()[id]
  // }

  // getAllTranslations(){


  //   return this.http.get<Translation[]>(this._languageURL)
  // }
}
