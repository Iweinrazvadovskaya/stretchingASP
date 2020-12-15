using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.Models.ModelsDto
{
    public class CompletedClassDto
    {
            public int user_id { get; set; }
            public int workout_day { get; set; }
            public int program_id { get; set; }
            public string date { get; set; }
        
    }
}
