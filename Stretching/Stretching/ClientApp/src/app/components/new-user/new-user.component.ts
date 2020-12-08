import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private servise: UserService, private fb: FormBuilder, private router: Router) { }
  addExerciseForm: FormGroup;

  ngOnInit() {

    this.addExerciseForm = this.fb.group({
      id: [548],
      user_name: [null, Validators.required],
      user_password: [null, Validators.required],
      role: [null, Validators.required],
      height:[null, Validators.required],
      weight_:[null, Validators.required],
      desired_weight:[null, Validators.required]
    });
  }

  onSubmit(){
    this.addExerciseForm.value.height = Number(this.addExerciseForm.value.height);
    this.addExerciseForm.value.weight_ = Number(this.addExerciseForm.value.weight_);
    this.addExerciseForm.value.desired_weight = Number(this.addExerciseForm.value.desired_weight);

    this.servise.addUser(this.addExerciseForm.value).subscribe(data => {
      this.router.navigate(['/users']);
    },
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () =>
      console.log('good') );
  }

}
