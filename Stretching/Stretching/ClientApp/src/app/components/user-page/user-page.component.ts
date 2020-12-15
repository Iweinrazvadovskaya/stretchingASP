import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'oidc-client';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private service: UserService) { }

  addWeightForm: FormGroup;

  user: User1
  program: string
  completedWorkouts: number
  ngOnInit() {
    this.getUserData()
    this.getWorkoutPassed()

    this.addWeightForm = new FormGroup({
      weight: new FormControl()
    });
  }

  getUserData(){

    this.service.getUserData(Number(localStorage.getItem('user_id')))
    .subscribe(data => {
      this.user = data
      if (data.program == 1){
        this.program = 'lite'
      }  else {
        this.program = 'pro'
      }
    });

  }

  getWorkoutPassed(){
    this.service.getWorkoutPassed(Number(localStorage.getItem('user_id'))).subscribe(data => {
        this.completedWorkouts = data;
    });
  }

  updateWeight(weight: string){
    this.user.weight_ = Number(weight);
    this.service.editExerciseTranslation(this.user).subscribe(data => {
      location.reload();
  });
  }
}
//weight
