using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class UserInfo
    {
        public int id { get; set; }
        public string height { get; set; }
        public string weight_ { get; set; }
        public string desired_weight { get; set; }
        public int user_id { get; set; }
    }
}
