import { UserService } from './../../services/user.service';
import { ThrowStmt } from '@angular/compiler';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthenticationService, private userService: UserService, private _route: Router){}

  ngOnInit(){
  }

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated()
  }

  login(name: string, password:string){
    // const md5 = new Md5();

    // console.log(String(md5.appendStr("Qwerty1909!").end()))
    // console.log(String(md5.appendStr("88888888").end()))
    // console.log(String(md5.appendStr("janejane").end()))

    // password = String(md5.appendStr(password).end());
    this.as.login(name, password).subscribe( res =>{
      this.userService.getUserRole(name).subscribe( res =>{
          if (res.role == 'admin'){
            localStorage.setItem('user_id', String(res.id));
            this._route.navigate(["/home"])
          } else {
            localStorage.setItem('user_id', String(res.id));
            this._route.navigate(["/user-page"])
          }
        });

    }, error => {
      alert('Wrong login or password.')
    })
  }

  logout(){
    this.as.logout()
  }
}
