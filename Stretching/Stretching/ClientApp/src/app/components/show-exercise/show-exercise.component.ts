import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-show-exercise',
  templateUrl: './show-exercise.component.html',
  styleUrls: ['./show-exercise.component.css']
})
export class ShowExerciseComponent implements OnInit {
  exerciseId: number;
  exercise: ExerciseTranslation;
  constructor(private route: ActivatedRoute, private service: ExerciseService, private _router: Router) {

   }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.exerciseId = +Number(this.route.snapshot.paramMap.get('exerciseId'));
    this.service.getExercisesById(this.exerciseId)
    .subscribe(data => {
      this.exercise = data
      console.log(data)
    });

    console.log(this.exercise);
  }
}
