using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ConsumeJwtDbApi.Models
{
    public class UserInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "User Name should contain only letters")]
        public string UserName { get; set; }
        [Required]
       [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character")]
        public string Password { get; set; }
        public string Role { get; set; } = "Admin";
    }

}