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
    return this.http.get<ExerciseTranslation[]>(this._baseURL)
  }

  addExercise(){
    
  }
  // getExercise(id: number){
  //   return this.getAllExercises()[id]
  // }

  // getAllTranslations(){


  //   return this.http.get<Translation[]>(this._languageURL)
  // }
}


