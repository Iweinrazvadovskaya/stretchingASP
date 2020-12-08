import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-user-menu',
  templateUrl: './nav-user-menu.component.html',
  styleUrls: ['./nav-user-menu.component.css']
})
export class NavUserMenuComponent implements OnInit {

  constructor() { }

  isExpanded = false;

  ngOnInit() {
  }

   collapse() {
     this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
