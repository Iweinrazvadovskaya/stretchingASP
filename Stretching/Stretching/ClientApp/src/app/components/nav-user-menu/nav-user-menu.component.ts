import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-user-menu',
  templateUrl: './nav-user-menu.component.html',
  styleUrls: ['./nav-user-menu.component.css']
})
export class NavUserMenuComponent implements OnInit {

  constructor(private as: AuthenticationService){}

  isExpanded = false;

  ngOnInit() {
  }

   collapse() {
     this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout(){
    this.as.logout()
  }
}
