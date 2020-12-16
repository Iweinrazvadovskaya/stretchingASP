import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest, mergeMap, throttleTime } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  _baseURL = 'api/exercises';
  _languageURL = 'api/exercisetranslations'

  constructor(private http: HttpClient) { }

  getAllExercises() {
    return this.http.get<ExerciseTranslation[]>(this._baseURL)
  }

  addExerciseTranslation(exercise: ExerciseTranslation) {
    return this.http.post<ExerciseTranslation>(this._baseURL, exercise);
  }

  editExerciseTranslation(exercise: ExerciseTranslation, exerciseId: number){
    exercise.id = exerciseId;
    console.log(exercise);

    return this.http.put<ExerciseTranslation>(this._baseURL + '/' + exerciseId, exercise );
  }

  // addTranslation(translation: Translation) {
  //   return this.http.post(this._languageURL, translation);
  // }

  deleteExercise(id: number) {
    return this.http.delete(this._baseURL + '?id=' + id);
  }

  getExercisesName() {
    return this.http.get<ExerciseNames[]>(this._baseURL + '/exrciseNames')
  }

  getExercisesById(id: number) {
    console.log(id);
    return this.http.get<ExerciseTranslation>(this._baseURL + '/' + id);

  }
}
