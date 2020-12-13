import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  // public get isLoggedIn(): boolean {
  //   return this.as.isAuthenticated()
  // }

  // constructor(private as: AuthenticationService){}

  // login(nae: string, password:string){
  //   this.as.login(name, password).subscribe( res =>{

  //   }, error => {
  //     alert('Wrong login or password.')
  //   })
  // }

  // logout(){
  //   this.as.logout
  // }
}
