import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.css']
})
export class NewExerciseComponent implements OnInit {

  constructor(private servise: ExerciseService, private fb: FormBuilder, private router: Router) { }

  addExerciseForm: FormGroup;


  ngOnInit() {
    this.addExerciseForm = this.fb.group({
      id:[Math.floor(Math.random()*1000)],
      preview_url:[null, Validators.required],
      video_url:[null, Validators.required],
      short_name:[null, Validators.required]
    })
  }

  onSubmit(){
    this.servise.addExercise(this.addExerciseForm.value).subscribe(data => {
      this.router.navigate(["/exercises"])
    })
  }

}
