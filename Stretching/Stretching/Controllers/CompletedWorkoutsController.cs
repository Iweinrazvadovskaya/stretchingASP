using System;
using System.Collections.Generic;
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
    public class CompletedWorkoutsController : ControllerBase
    {
        private readonly StretchingContext _context;

        public CompletedWorkoutsController(StretchingContext context)
        {
            _context = context;
        }

        // GET: api/CompletedWorkouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompletedWorkout>>> Getworkout_plan()
        {
            return await _context.workout_plan.ToListAsync();
        }

        // GET: api/CompletedWorkouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompletedWorkout>> GetCompletedWorkout(int id)
        {
            var completedWorkout = await _context.workout_plan.FindAsync(id);

            if (completedWorkout == null)
            {
                return NotFound();
            }

            return completedWorkout;
        }

        // PUT: api/CompletedWorkouts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompletedWorkout(int id, CompletedWorkout completedWorkout)
        {
            if (id != completedWorkout.id_p)
            {
                return BadRequest();
            }

            _context.Entry(completedWorkout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompletedWorkoutExists(id))
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

        [HttpGet("workoutPassed")]
        public int getPassedWorkoutCount(int id)
        {
            
              var result = _context.workout_plan
                  .Select(
                 workout_exercise => new
                 {
                     _id = workout_exercise.user_id
                 }
                ).Where(j => j._id == id)
                 .ToList()
                ;
            if (result.Count == 0)
            {
                return 0;
            }
            return result.Count();
        }

        // POST: api/CompletedWorkouts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public void PostCompletedWorkout([FromBody] CompletedClassDto completedWorkout)
        {
            var workoutEntity = new CompletedWorkout() {
                workout_day = completedWorkout.workout_day,
                program_id = completedWorkout.program_id,
                user_id = completedWorkout.user_id };

            _context.workout_plan.Add(workoutEntity);
            _context.SaveChanges();
        }

        // DELETE: api/CompletedWorkouts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CompletedWorkout>> DeleteCompletedWorkout(int id)
        {
            var completedWorkout = await _context.workout_plan.FindAsync(id);
            if (completedWorkout == null)
            {
                return NotFound();
            }

            _context.workout_plan.Remove(completedWorkout);
            await _context.SaveChangesAsync();

            return completedWorkout;
        }

        private bool CompletedWorkoutExists(int id)
        {
            return _context.workout_plan.Any(e => e.id_p == id);
        }
    }
}
