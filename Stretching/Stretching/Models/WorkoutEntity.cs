using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class WorkoutEntity
    {
        [Key] public int w_id { get; set; }
        public string repeats { get; set; }
        public int exercise_id { get; set; }
        public int program_id { get; set; }
        public int sequence { get; set; }
        public int day { get; set; }
    }
}
