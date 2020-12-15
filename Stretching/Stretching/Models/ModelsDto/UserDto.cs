using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.Models.ModelsDto
{
    public class UserDto
    {
        public string user_name { get; set; }
        public string user_password { get; set; }
        public string role { get; set; }
        public int height { get; set; }
        public int weight_ { get; set; }
        public int desired_weight { get; set; }
        public int program { get; set; }

    }
}
