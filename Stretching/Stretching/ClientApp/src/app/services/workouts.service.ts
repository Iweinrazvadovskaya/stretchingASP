import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkoutDayDto } from '../interfaces/WorkoutDayDto';

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
    console.log(day + 'dshujioko' + program)
    return this.http.get<WorkoutExercise[]>(this._baseURL + "/workout?program=" + program + "&day="+ day);
  }

  addExerciseInWorkout(workout: Workout) {
    console.log(workout)

    return this.http.post<Workout>(this._baseURL, workout);
  }

  addWorkoutDay(workoutDay: Array<WorkoutDayDto>){
    return this.http.post<Array<WorkoutDayDto>>(this._baseURL + '/workoutDay', workoutDay);
  }

  getWorkoutExerciseByProgramDaySequence(day: number, program: number, sq: number){
    return this.http.get<WorkoutExercise>(this._baseURL +  "/exercise?program=" + program + "&day="+ day + "&sequence=" + sq);
  }

  getLastSequenceNumber(day: number, program: number){
    return this.http.get<number>(this._baseURL +  "/sequencesMax?program=" + program + "&day="+ day);
  }

  getWorkoutExerciseById(id: number){
    return this.http.get<WorkoutEntityDto>(this._baseURL + '/' + id );
  }

  editWorkoutTranslation(exercise: Workout){
    console.log(exercise);

    return this.http.put<Workout>(this._baseURL + '/0', exercise );
  }

  deleteExercise(id: number){
    return this.http.delete(this._baseURL + '/' + id);
  }
}
