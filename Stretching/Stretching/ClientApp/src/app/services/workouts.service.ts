import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  _baseURL: string = "api/WorkoutEntities";

  constructor(private http: HttpClient) { }

  getAllWorkouts() {
    return this.http.get<WorkoutNumber[]>(this._baseURL)
  }
}
