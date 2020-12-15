import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          role: 'user',
          user_name: ['', Validators.required],
          height: ['', Validators.required],
          weight_: ['', Validators.required],
          desired_weight: ['', Validators.required],
          program: ['', Validators.required],
          user_password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    const md5 = new Md5();
    this.registerForm.value.height = Number(this.registerForm.value.height);
    this.registerForm.value.weight_ = Number(this.registerForm.value.weight_);
    this.registerForm.value.desired_weight = Number(this.registerForm.value.desired_weight);
    // this.registerForm.value.user_password = String(md5.appendStr(this.registerForm.value.user_password).end());

    if (this.registerForm.value.program == 'lite'){
      this.registerForm.value.program = Number(1);
    } else {
      this.registerForm.value.program = Number(2);
    }
    console.log(this.registerForm.value)
      this.userService.addUser(this.registerForm.value).subscribe(data => {
        this.router.navigate(['']);
      });
    }
}
