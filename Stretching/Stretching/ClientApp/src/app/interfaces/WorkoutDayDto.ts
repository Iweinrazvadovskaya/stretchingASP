export class WorkoutDayDto {
  repeats;
  exercise_id: number;
  program_id;
  sequence;
  day;

  constructor(  repeats, exercise_id: number, program_id, sequence, day){
    this.day = day;
    this.exercise_id = exercise_id;
    this.program_id = program_id;
    this.repeats = repeats;
    this.sequence = sequence;
  }
}
