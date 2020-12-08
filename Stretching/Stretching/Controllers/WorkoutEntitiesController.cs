using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Stretching.Context;
using Stretching.Models.ModelsDto;
using Stretching.MVC.Models;

namespace Stretching.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutEntitiesController : ControllerBase
    {
        private readonly StretchingContext _context;

        public WorkoutEntitiesController(StretchingContext context)
        {
            _context = context;
        }

        // GET: api/WorkoutEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutEntity>>> Getworkout_entity()
        {
            return await _context.workout_entity.ToListAsync();
        }

        // GET: api/WorkoutEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutEntity>> GetWorkoutEntity(int id)
        {
            var workoutEntity = await _context.workout_entity.FindAsync(id);

            if (workoutEntity == null)
            {
                return NotFound();
            }

            return workoutEntity;
        }

        /*        [Route("GetDayByProgram")]
                [HttpGet("{name}")]
                public async Task<ActionResult<WorkoutEntity>> GetDayByProgram(int name)
                {
                    var workoutEntity = await _context.workout_entity.FirstOrDefaultAsync(p => p.program_id == program_i); ;

                    if (workoutEntity == null)
                    {
                        return NotFound();
                    }

                    return workoutEntity;
                }*/

        [HttpGet("program")]
        public List<int> GetProgramm(int id)
        {
            return _context.workout_entity.Where(o => o.program_id == id).Select(o => o.day).Distinct().OrderBy(o => o).ToList();
        }

        [HttpGet("workout")]
        public string GetWorkoutByProgramAndDay(int program, int day)
        {
            return JsonConvert.SerializeObject(_context.workout_entity
                .Join(_context.stretching_exercise,
                    w => w.exercise_id,
                    e => e.id,
                    (w, e) => new { w, e})
                .Join(_context.exercise_translation_entity,
                    w => w.e.id, tr => tr.parent_id, (w, tr) => new { w.e, w.w, tr})
                .Join(_context.stretching_program,
                w => w.w.program_id, pr => pr.p_id, (w, pr) => new { w.w, w.e, w.tr, pr})
                .Select(
                 workout_exercise => new
                 {
                     day = workout_exercise.w.day,
                     sequence = workout_exercise.w.sequence,
                     time = workout_exercise.w.repeats,
                     preview_url = workout_exercise.e.preview_url,
                     exercise_id = workout_exercise.w.exercise_id,
                     video_url = workout_exercise.e.video_url,
                     short_name = workout_exercise.e.short_name,
                     name = workout_exercise.tr.name,
                     language = workout_exercise.tr.lang,
                     description = workout_exercise.tr.description,
                     program_name = workout_exercise.pr.program_name,
                     program_id = workout_exercise.pr.p_id
                 }
                ).Where(o => o.program_id == program && o.day == day && o.language == "ru").OrderBy(o => o.sequence)
                .ToList());
        }

        // PUT: api/WorkoutEntities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkoutEntity(int id, WorkoutEntity workoutEntity)
        {
            if (id != workoutEntity.w_id)
            {
                return BadRequest();
            }

            _context.Entry(workoutEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WorkoutEntities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public void PostWorkoutEntity([FromBody] WorkoutDto dto)
        {
            var workoutEntity = new WorkoutEntity() {repeats = dto.repeats, day = dto.day, exercise_id = dto.exercise_id, program_id = dto.program_id, sequence = dto.sequence};

            _context.workout_entity.Add(workoutEntity);
            _context.SaveChanges();
        }

        [HttpPost("workoutDay")]
        public void PostWorkouts([FromBody] List<WorkoutDto> dto)
        {

            for(int i=0; i < dto.Count(); i++)
            {
                var workoutEntity = new WorkoutEntity() { repeats = dto[i].repeats, day = dto[i].day, exercise_id = dto[i].exercise_id, program_id = dto[i].program_id, sequence = dto[i].sequence };
                _context.workout_entity.Add(workoutEntity);
                _context.SaveChanges();
            }
        }

        /*        [HttpDelete("workoutDayDelete")]
                public Exercise DeleteWorkoutDay(int day)
                {
                    var exercise = _context.stretching_exercise.Find(day);

                    _context.stretching_exercise.Remove(exercise);
                    _context.SaveChanges();

                    return exercise;
                }*/

        // DELETE: api/WorkoutEntities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkoutEntity>> DeleteWorkoutEntity(int id)
        {
            var workoutEntity = await _context.workout_entity.FindAsync(id);
            if (workoutEntity == null)
            {
                return NotFound();
            }

            _context.workout_entity.Remove(workoutEntity);
            await _context.SaveChangesAsync();

            return workoutEntity;
        }

        private bool WorkoutEntityExists(int id)
        {
            return _context.workout_entity.Any(e => e.w_id == id);
        }
    }
}
