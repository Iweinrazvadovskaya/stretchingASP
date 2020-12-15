import { Router } from '@angular/router';
import { AUTH_API_URL } from './../app-injection-tokens';
import { Token } from './../interfaces/Token';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const ACCESS_TOKEN_KEY = 'ATRETCHING_ACCESS_TOKEN'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User1>;
  public currentUser: Observable<User1>;

  constructor(private http: HttpClient, @Inject(AUTH_API_URL) private apiUrl: string,
  private jwtHelper: JwtHelperService,
  private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User1>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user_name: string, user_password: string): Observable<Token> {
    console.log(user_name)
      return this.http.post<Token>(`api/UserAccounts/login`, { user_name, user_password })
          .pipe(tap(token => {
              localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
          }));
  }

  logout(): void {
      // remove user from local storage to log user out
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      this.router.navigate(['']);
  }

  isAuthenticated(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token)
  }
}
