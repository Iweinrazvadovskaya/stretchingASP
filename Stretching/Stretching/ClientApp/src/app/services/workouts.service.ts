import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  _baseURL: string = "api/WorkoutEntities";

  constructor(private http: HttpClient) { }

  getWorkoutsByProgram(program_id: number){

    return this.http.get<number[]>(this._baseURL + "/program?id=" + program_id);
  }

  getWorkoutByProgramAndDay(day: number, program: number){
    return this.http.get<WorkoutExercise[]>(this._baseURL + "/workout?program=" + program + "&day="+ day);
  }

  addExerciseInWorkout(workout: Workout) {
    console.log(workout)
    return this.http.post<Workout>(this._baseURL, workout);
  }
}
