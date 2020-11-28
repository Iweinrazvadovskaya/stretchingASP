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
    public class ExercisesController : ControllerBase
    {
        private readonly StretchingContext _context;

        public ExercisesController(StretchingContext context)
        {
            _context = context;
        }

        // GET: api/Exercises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> Getstretching_exercise()
        {
            var listTrEx = from a in _context.stretching_exercise
                                               join p in _context.exercise_translation_entity on a.id equals p.parent_id where p.lang == "ru"
                           select new
                                              {
                                                  id = a.id,
                                                  name = p.name,
                                                  description = p.description,
                                                  preview = a.preview_url,
                                                  video_url = a.video_url,
                                                  lang = p.lang,
                                                  short_name = a.short_name
                                              };
            return await listTrEx.ToListAsync();
        }

        // GET: api/Exercises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetExercise(int id)
        {
            var exercise = await _context.stretching_exercise.FindAsync(id);

            if (exercise == null)
            {
                return NotFound();
            }

            return exercise;
        }

        // PUT: api/Exercises/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercise(int id, Exercise exercise)
        {
            if (id != exercise.id)
            {
                return BadRequest();
            }

            _context.Entry(exercise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseExists(id))
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

        // POST: api/Exercises
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Exercise>> PostExercise(Exercise exercise)
        {
            _context.stretching_exercise.Add(exercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExercise", new { id = exercise.id }, exercise);
        }

        // DELETE: api/Exercises/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Exercise>> DeleteExercise(int id)
        {
            var exercise = await _context.stretching_exercise.FindAsync(id);
            if (exercise == null)
            {
                return NotFound();
            }

            _context.stretching_exercise.Remove(exercise);
            await _context.SaveChangesAsync();

            return exercise;
        }

        private bool ExerciseExists(int id)
        {
            return _context.stretching_exercise.Any(e => e.id == id);
        }

        public IQueryable<Object> GetExercisesTranslation()
        {
            return from a in _context.stretching_exercise
                   join p in _context.exercise_translation_entity on a.id equals p.parent_id
                   select new
                   {
                       id = a.id,
                       name = p.name,
                       description = p.description,
                       preview = a.preview_url,
                       video = a.video_url,
                       language = p.lang
                   };
        }
    }
}
