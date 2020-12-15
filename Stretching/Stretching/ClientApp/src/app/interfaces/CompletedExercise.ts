export class CompletedExercise {
  user_id: number;
  workout_day: number;
  program_id: number;

  constructor(  user_id: number, workout_day: number, program_id: number){
    this.user_id = user_id;
    this.workout_day = workout_day;
    this.program_id = program_id;
  }
}
