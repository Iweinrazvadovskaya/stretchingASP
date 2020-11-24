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

        // POST: api/CompletedWorkouts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CompletedWorkout>> PostCompletedWorkout(CompletedWorkout completedWorkout)
        {
            _context.workout_plan.Add(completedWorkout);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompletedWorkout", new { id = completedWorkout.id_p }, completedWorkout);
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
