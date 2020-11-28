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
    public class ExerciseTranslationsController : ControllerBase
    {
        private readonly StretchingContext _context;

        public ExerciseTranslationsController(StretchingContext context)
        {
            _context = context;
        }

        // GET: api/ExerciseTranslations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseTranslation>>> Getexercise_translation_entity()
        {
            return await _context.exercise_translation_entity.ToListAsync();
        }

        // GET: api/ExerciseTranslations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExerciseTranslation>> GetExerciseTranslation(int id)
        {
            var exerciseTranslation = await _context.exercise_translation_entity.FindAsync(id);

            if (exerciseTranslation == null)
            {
                return NotFound();
            }

            return exerciseTranslation;
        }

        // PUT: api/ExerciseTranslations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExerciseTranslation(int id, ExerciseTranslation exerciseTranslation)
        {
            if (id != exerciseTranslation.t_id)
            {
                return BadRequest();
            }

            _context.Entry(exerciseTranslation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseTranslationExists(id))
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

        // POST: api/ExerciseTranslations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ExerciseTranslation>> PostExerciseTranslation(ExerciseTranslation exerciseTranslation)
        {
            _context.exercise_translation_entity.Add(exerciseTranslation);
            await _context.SaveChangesAsync();
            var ex = exerciseTranslation;
            return CreatedAtAction("GetExerciseTranslation", null, exerciseTranslation);
        }

        // DELETE: api/ExerciseTranslations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExerciseTranslation>> DeleteExerciseTranslation(int id)
        {
            var exerciseTranslation = await _context.exercise_translation_entity.FindAsync(id);
            if (exerciseTranslation == null)
            {
                return NotFound();
            }

            _context.exercise_translation_entity.Remove(exerciseTranslation);
            await _context.SaveChangesAsync();

            return exerciseTranslation;
        }

        private bool ExerciseTranslationExists(int id)
        {
            return _context.exercise_translation_entity.Any(e => e.t_id == id);
        }
    }
}
