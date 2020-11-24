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
    public class ProgramExercisesController : ControllerBase
    {
        private readonly StretchingContext _context;

        public ProgramExercisesController(StretchingContext context)
        {
            _context = context;
        }

        // GET: api/ProgramExercises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgramExercise>>> Getstretching_program()
        {
            return await _context.stretching_program.ToListAsync();
        }

        // GET: api/ProgramExercises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProgramExercise>> GetProgramExercise(int id)
        {
            var programExercise = await _context.stretching_program.FindAsync(id);

            if (programExercise == null)
            {
                return NotFound();
            }

            return programExercise;
        }

        // PUT: api/ProgramExercises/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgramExercise(int id, ProgramExercise programExercise)
        {
            if (id != programExercise.p_id)
            {
                return BadRequest();
            }

            _context.Entry(programExercise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgramExerciseExists(id))
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

        // POST: api/ProgramExercises
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProgramExercise>> PostProgramExercise(ProgramExercise programExercise)
        {
            _context.stretching_program.Add(programExercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgramExercise", new { id = programExercise.p_id }, programExercise);
        }

        // DELETE: api/ProgramExercises/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProgramExercise>> DeleteProgramExercise(int id)
        {
            var programExercise = await _context.stretching_program.FindAsync(id);
            if (programExercise == null)
            {
                return NotFound();
            }

            _context.stretching_program.Remove(programExercise);
            await _context.SaveChangesAsync();

            return programExercise;
        }

        private bool ProgramExerciseExists(int id)
        {
            return _context.stretching_program.Any(e => e.p_id == id);
        }
    }
}
