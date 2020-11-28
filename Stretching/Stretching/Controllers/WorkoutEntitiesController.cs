using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stretching.Context;
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
        public async Task<ActionResult<IEnumerable<Object>>> Getworkout_entity()
        {

            /*  var fullEntries = (from ep in _context.workout_entity
                                 join e in _context.stretching_exercise on ep.exercise_id equals e.id
                                 join t in _context.exercise_translation_entity on e.id equals t.parent_id
                                 join p in _context.stretching_program on ep.program_id equals p.p_id
                                 select new
                                 {
                                     w_id = ep.w_id,
                                     day = ep.day,
                                     name = t.name,
                                     description = t.description,
                                     preview = e.preview_url,
                                     video_url = e.video_url,
                                     lang = t.lang,
                                     short_name = e.short_name,
                                     program_name = p.program_name,
                                     p_id = p.p_id

                                 }); */


            var fullEntries = (from ep in _context.workout_entity
                               select new
                               {
                                   day = ep.day
                               });
            return await fullEntries.ToListAsync();
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
        public async Task<ActionResult<WorkoutEntity>> PostWorkoutEntity(WorkoutEntity workoutEntity)
        {
            _context.workout_entity.Add(workoutEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkoutEntity", new { id = workoutEntity.w_id }, workoutEntity);
        }

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
