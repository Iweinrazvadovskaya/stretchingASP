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
  addTranslationForm: FormGroup;

  ngOnInit() {
    var id_ = Math.floor(Math.random()*1000);

    this.addExerciseForm = this.fb.group({
      id: [id_],
      preview_url: [null, Validators.required],
      video_url: [null, Validators.required],
      short_name: [null, Validators.required]
    });

    this.addTranslationForm = this.fb.group({
      id:[Math.floor(Math.random()*1000)],
      name:[null, Validators.required],
      description:[null, Validators.required],
      lang:[null, Validators.required],
      parent_id:[id_]
    })
  }

  onSubmit(){
    this.servise.addExercise(this.addExerciseForm.value).subscribe(data => {
      this.router.navigate(["/exercises"])
    },
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () =>     this.servise.addTranslation(this.addTranslationForm.value).subscribe(data => {
      this.router.navigate(["/exercises"])
      console.log(this.router.getCurrentNavigation);
    })
  );

  }

}
