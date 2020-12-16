using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
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
    public class ExercisesController : ControllerBase
    {
        private Guid UserId => Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        private readonly StretchingContext _context;

        public ExercisesController(StretchingContext context)
        {
            _context = context;
        }

        // GET: api/Exercises
        [HttpGet]

        public IEnumerable<Object> Getstretching_exercise()
        {
            var listTrEx = from a in _context.stretching_exercise
                                               join p in _context.exercise_translation_entity on a.id equals p.parent_id where p.lang == "ru"
                           select new
                                              {
                                                  id = a.id,
                                                  name = p.name,
                                                  description = p.description,
                                                  preview_url = a.preview_url,
                                                  video_url = a.video_url,
                                                  lang = p.lang,
                                                  short_name = a.short_name
                                              };
            return listTrEx.ToList();
        }


        [HttpGet("exrciseNames")]
        public string getExercisesNames()
        {
            return JsonConvert.SerializeObject(
                 _context.stretching_exercise
                  .Select(
                 workout_exercise => new
                 {
                     exercise_id = workout_exercise.id,
                     short_name = workout_exercise.short_name
                 }
                )
                 .ToList()
                );
        }

        // GET: api/Exercises/5
        [HttpGet("{id}")]
        public ExerciseTranslatioDto GetExercise(int id)
        {
            var exercise = _context.stretching_exercise.Find(id);


            ExerciseTranslation translation =  _context.exercise_translation_entity.FirstOrDefault(i => i.parent_id == exercise.id);

            var newExercise = new ExerciseTranslatioDto() { id = id, preview_url = exercise.preview_url, short_name = exercise.short_name, video_url = exercise.video_url, description = translation.description, lang = translation.lang, name = translation.name  };

            return newExercise;
        }

        // PUT: api/Exercises/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercise(int id, ExerciseTranslatioDto exercise)
        {
            var newExercise = new Exercise() { id = id, preview_url = exercise.preview_url, short_name = exercise.short_name, video_url = exercise.video_url };

            if (id != newExercise.id)
            {
                return BadRequest();
            }

            _context.Entry(newExercise).State = EntityState.Modified;

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

            int id_tr = _context.exercise_translation_entity.Where(o => o.parent_id == exercise.id && o.lang == exercise.lang).Select(e => e.t_id).FirstOrDefault();

            var translation = new ExerciseTranslation()
            {
                t_id = id_tr,
                description = exercise.description,
                lang = exercise.lang,
                name = exercise.name,
                parent_id = id
            };

            _context.Entry(translation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Exercises
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public void PostExercise([FromBody] ExerciseTranslatioDto dto)
        {
            int id = _context.stretching_exercise.Max(o => o.id) + 1;
            Debug.WriteLine(JsonConvert.SerializeObject(dto));
            var newExercise = new Exercise() { id = id, preview_url = dto.preview_url, short_name = dto.short_name, video_url = dto.video_url };
            
            _context.stretching_exercise.Add(newExercise);
            _context.SaveChanges();

            //int id = _context.stretching_exercise.Where(o => o.short_name == dto.exrcise_short_name).Select(e => e.id).FirstOrDefault();

            _context.exercise_translation_entity.Add(new ExerciseTranslation() { description = dto.description, lang = dto.lang, name = dto.name, parent_id = id });
            _context.SaveChanges();
        }

        // DELETE: api/Exercises/5
        [HttpDelete]
        public Exercise DeleteExercise(int id)
        {
            var exercise = _context.stretching_exercise.Find(id);

            _context.stretching_exercise.Remove(exercise);
            _context.SaveChanges();

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
