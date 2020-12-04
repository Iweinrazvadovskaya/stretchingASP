using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.Models.ModelsDto
{
    public class WorkoutDto
    {
            public string repeats { get; set; }
            public int exercise_id { get; set; }
            public int program_id { get; set; }
            public int sequence { get; set; }
            public int day { get; set; }
    }
}
