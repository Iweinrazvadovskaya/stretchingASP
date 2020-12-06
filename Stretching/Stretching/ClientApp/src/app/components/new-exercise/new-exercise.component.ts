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
      id: [548],
      preview_url: [null, Validators.required],
      video_url: [null, Validators.required],
      short_name: [null, Validators.required],
      name:[null, Validators.required],
      description:[null, Validators.required],
      lang:[null, Validators.required]
    });
  }

  onSubmit(){
    this.servise.addExerciseTranslation(this.addExerciseForm.value).subscribe(data => {
      this.router.navigate(["/exercises"])
    },
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () =>
      console.log("good") );
  }
}
