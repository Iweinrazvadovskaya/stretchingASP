using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class ExerciseTranslation
    {
        [Key] public int t_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int parent_id { get; set; }
        public string lang { get; set; }
    }
}
