using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class CompletedWorkout
    {
        [Key] public int id_p { get; set; }
        public int user_id { get; set; }
        public int workout_day { get; set; }
        public int program_id { get; set; }
    }
}
