import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor( private route: ActivatedRoute, private service: UserService, private fb: FormBuilder, private router: Router) { }
  addExerciseForm: FormGroup;

  edit = false
  userEdit: User

  ngOnInit() {
    this.getParams();

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

    if (this.edit){
      console.log(this.addExerciseForm.value);
      this.addExerciseForm.value.id = this.userEdit.id;
      // this.service.editExerciseTranslation(this.addExerciseForm.value).subscribe(data =>
      //     this.router.navigate(["/exercises"])
      //     )
    } else {
      this.service.addUser(this.addExerciseForm.value).subscribe(data => {
        this.router.navigate(['/users']);
      },
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () =>
        console.log('good') );
    }

  }


  getParams(): void {
    var edit_ = +Number(this.route.snapshot.paramMap.get('edit'));
    var id = +Number(this.route.snapshot.paramMap.get('id'));

    if(edit_ == 1){
      this.edit = true

      var exId = +this.route.snapshot.paramMap.get('lastId');
      this.service.getUserById(id)
      .subscribe(data => {
        this.userEdit = data
        console.log(data)
        this.addExerciseForm.controls['id'].setValue(this.userEdit.id);
        this.addExerciseForm.controls['user_name'].setValue(this.userEdit.user_name);
        this.addExerciseForm.controls['user_password'].setValue(this.userEdit.user_password);
        this.addExerciseForm.controls['role'].setValue(this.userEdit.role);
        this.addExerciseForm.controls['height'].setValue(this.userEdit.height);
        this.addExerciseForm.controls['weight_'].setValue(this.userEdit.weight_);
        this.addExerciseForm.controls['desired_weight'].setValue(this.userEdit.desired_weight);
       });
    } else {
      this.edit = false
    }

  }
}
