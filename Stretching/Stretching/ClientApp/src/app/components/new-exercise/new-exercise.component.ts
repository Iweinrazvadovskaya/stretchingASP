import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.css']
})
export class NewExerciseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ExerciseService, private fb: FormBuilder, private router: Router) { }

  addExerciseForm: FormGroup;
  exerciseEdit: ExerciseTranslation
  ngOnInit() {

    this.getParamsAndSetEx()

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

  getParamsAndSetEx(){
    var edit = +this.route.snapshot.paramMap.get('edit');
    if (edit == 1){
      var exId = +this.route.snapshot.paramMap.get('id');
      this.service.getExercisesById(exId)
      .subscribe(data => {
        this.exerciseEdit = data
        console.log(data)
        this.addExerciseForm.controls['name'].setValue(this.exerciseEdit.name);
        this.addExerciseForm.controls['description'].setValue(this.exerciseEdit.description);
        this.addExerciseForm.controls['lang'].setValue(this.exerciseEdit.lang);
        this.addExerciseForm.controls['preview_url'].setValue(this.exerciseEdit.preview_url);
        this.addExerciseForm.controls['video_url'].setValue(this.exerciseEdit.video_url);
        this.addExerciseForm.controls['short_name'].setValue(this.exerciseEdit.short_name);

      });
      console.log(edit);
      console.log(this.exerciseEdit);
    }
  }

  onSubmit(){
    if (this.exerciseEdit != null){
      console.log(this.addExerciseForm.value);
      this.service.editExerciseTranslation(this.addExerciseForm.value, this.exerciseEdit.id).subscribe(data =>
          this.router.navigate(["/exercises"])
          )
    }
    else {
    this.service.addExerciseTranslation(this.addExerciseForm.value).subscribe(data => {
      this.router.navigate(["/exercises"])
    },
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () =>
      console.log("good") );
  }
  }
}
