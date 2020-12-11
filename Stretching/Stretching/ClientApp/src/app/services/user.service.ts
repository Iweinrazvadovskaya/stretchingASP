import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _baseURL = 'api/UserAccounts';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(this._baseURL);
  }

  deleteUser(id: number) {
    console.log(id);

    return this.http.delete(this._baseURL + '?id=' + id);
  }

  addUser(user: UserDto){
    console.log(user);
    return this.http.post(this._baseURL, user);
  }

  getAll() {
    return this.http.get<User[]>(`/users`);
}

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }
}
