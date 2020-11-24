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

  getAllExercises(){

    // var exercises = this.http.get<Exercise[]>(this._baseURL)
    // exercises.subscribe(result => {
    //   result.forEach(
    //     exercise => {
    // }
    // )});

    // var exersisTranslation = forkJoin(exercises, exersisTranslation).subscribe(results => {
    //   results[0].homeworld = results[1];
    //   this.loadedCharacter = results[0];
    // });
    return this.http.get<ExerciseTranslation[]>(this._baseURL)
  }

  // getExercise(id: number){
  //   return this.getAllExercises()[id]
  // }

  // getAllTranslations(){


  //   return this.http.get<Translation[]>(this._languageURL)
  // }
}


