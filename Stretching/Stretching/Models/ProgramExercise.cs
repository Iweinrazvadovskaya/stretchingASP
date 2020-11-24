using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class ProgramExercise
    {
        [Key] public int p_id { get; set; }
        public string program_name { get; set; }
    }
}
