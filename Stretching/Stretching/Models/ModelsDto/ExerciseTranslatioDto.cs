using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.Models.ModelsDto
{
    public class ExerciseTranslatioDto
    {
        public int id { get; set; }
        public string preview_url { get; set; }
        public string video_url { get; set; }
        public string short_name { get; set; }

        //translation
        public string name { get; set; }
        public string description { get; set; }
        public string lang { get; set; }
    }
}
