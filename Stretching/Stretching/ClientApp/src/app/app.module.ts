import { DaylyWorkoutComponent } from './components/dayly-workout/dayly-workout.component';
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
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { AddExerciseInWorkoutComponent } from './components/add-exercise-in-workout/add-exercise-in-workout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { NewDayComponent } from './components/new-day/new-day.component';
import {MatInputModule} from '@angular/material/input';
import { UsersComponent } from './components/users/users.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { LoginComponent } from './components/login/login.component';
import { NavUserMenuComponent } from './components/nav-user-menu/nav-user-menu.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ListExercisesComponent } from './components/list-exercises/list-exercises.component';
import { ShowExerciseComponent } from './components/show-exercise/show-exercise.component';
import { MatCardModule } from '@angular/material/card';
import { UserSideComponent } from './components/user-side/user-side.component';
import { AdminSideComponent } from './components/admin-side/admin-side.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ShowExerciseWorkoutComponent } from './components/show-exercise-workout/show-exercise-workout.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ExercisesComponent,

    NewExerciseComponent,

    WorkoutsComponent,

    WorkoutComponent,

    AddExerciseInWorkoutComponent,
    NewDayComponent,
    UsersComponent,
    NewUserComponent,
    LoginComponent,
    ShowExerciseComponent,
    NavUserMenuComponent,
    ListExercisesComponent,
    DaylyWorkoutComponent,
    UserPageComponent,
    UserSideComponent,
    AdminSideComponent,
    ShowExerciseWorkoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user-side', component: UserSideComponent },
      { path: '', component: LoginComponent, pathMatch: 'full'  },
      { path: 'nav-user-menu', component: NavUserMenuComponent },
      { path: 'user-page', component: UserPageComponent },
      { path: 'list-exercises', component: ListExercisesComponent },
      { path: 'show-exercise/:exerciseId', component: ShowExerciseComponent },
      { path: 'show-exercise-workout/:program/:day/:sequence', component: ShowExerciseWorkoutComponent },
      { path: 'dayly-workout', component: DaylyWorkoutComponent },


      { path: 'admin-side', component: AdminSideComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'new-exercise/:edit/:id', component: NewExerciseComponent },
      { path: 'new-user', component: NewUserComponent },
      { path: 'workouts', component: WorkoutsComponent },
      { path: 'workout/:program/:day', component: WorkoutComponent },
      { path: 'add-exercise-in-workout/:day/:program/:lastId/:edit/:w_id', component: AddExerciseInWorkoutComponent },
      { path: 'new-day/:program/:lastDay', component: NewDayComponent }
    ]),
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [ExerciseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
