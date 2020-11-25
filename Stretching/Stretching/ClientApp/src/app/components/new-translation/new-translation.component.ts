import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-new-translation',
  templateUrl: './new-translation.component.html',
  styleUrls: ['./new-translation.component.css']
})
export class NewTranslationComponent implements OnInit {

  constructor(private servise: ExerciseService, private fb: FormBuilder, private router: Router) { }

  addTranslationForm: FormGroup;

  ngOnInit() {
    this.addTranslationForm = this.fb.group({
      id:[Math.floor(Math.random()*1000)],
      name:[null, Validators.required],
      description:[null, Validators.required],
      lang:[null, Validators.required],
      parent_id:[null, Validators.required]
    })
  }

  onSubmit(){
    this.servise.addExercise(this.addTranslationForm.value).subscribe(data => {
      this.router.navigate(["/exercises"])
    })
  }

}
