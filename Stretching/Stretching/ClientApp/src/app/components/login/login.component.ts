import { ThrowStmt } from '@angular/compiler';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthenticationService){}

  ngOnInit(){
  }

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated()
  }

  login(name: string, password:string){
    this.as.login(name, password).subscribe( res =>{

    }, error => {
      alert('Wrong login or password.')
    })
  }

  logout(){
    this.as.logout()
  }
}
