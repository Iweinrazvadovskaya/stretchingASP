import { CompletedExercise } from './../interfaces/CompletedExercise';
import { combineLatest } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _baseURL = 'api/UserAccounts';
  completed_url = 'api/CompletedWorkouts';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User1[]>(this._baseURL);
  }

  deleteUser(id: number) {
    console.log(id);

    return this.http.delete(this._baseURL + '/' + id);
  }

  addUser(user: UserDto){
    console.log(user);
    return this.http.post(this._baseURL, user);
  }

  getAll() {
    return this.http.get<User1[]>(`/users`);
}

  register(user: UserDto) {
    return this.http.post(this._baseURL, user);
  }

  // getUserById(id: number){
  //   return this.http.get<User>(this._baseURL + '/userDto/' + id)
  // }

  getUserRole(name: string){
    console.log(name)
    return this.http.get<RoleId>(this._baseURL + '/userRole?name=' + name)
  }

  getUserData(id:number){
    return this.http.get<User1>(this._baseURL + '/userDto?id=' + id)
  }

  getUserDataWithWorkoutData(id:number){
    return this.http.get<User1>(this._baseURL + '/userDataWorkoutData?id=' + id)
  }

  editExerciseTranslation(usr: User1){
    console.log(usr);

    return this.http.put<User1>(this._baseURL + '/' + usr.id, usr );
  }

  getWorkoutPassed(id: number){
    return this.http.get<number>(this.completed_url + '/workoutPassed?id=' + id)
  }

  putCompletedExercise(completed: CompletedExercise){
    return this.http.post<CompletedExercise>(this.completed_url, completed );
  }
}
