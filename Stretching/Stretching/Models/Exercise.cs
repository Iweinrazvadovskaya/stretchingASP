using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class Exercise
    {

        [Key] public int id { get; set; }
        public string preview_url { get; set; }
        public string video_url { get; set; }
        public string short_name { get; set; }
    }
}
