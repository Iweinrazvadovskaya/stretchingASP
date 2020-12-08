using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Stretching.MVC.Models
{
    public class UserAccount
    {
        [Key] public int id { get; set; }
        public string user_name { get; set; }
        public string user_password { get; set; }
        public string role { get; set; }

    }
}
