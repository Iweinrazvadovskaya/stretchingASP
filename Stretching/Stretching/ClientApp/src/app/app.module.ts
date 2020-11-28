import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ExerciseService } from './services/exercise.service';
import { NewExerciseComponent } from './components/new-exercise/new-exercise.component';
import { NewTranslationComponent } from './components/new-translation/new-translation.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,

    ExercisesComponent,

    NewExerciseComponent,

    NewTranslationComponent,

    WorkoutsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'new-exercise', component: NewExerciseComponent },
      { path: 'new-translation', component: NewExerciseComponent },
      { path: 'workouts', component: WorkoutsComponent }

    ])
  ],
  providers: [ExerciseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
