import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private _router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number){
    this.service.deleteUser(id).subscribe(data => {
      this._router.navigate(["/users"])
    })
  }
}
