using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JwtDbApi.Models
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
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$", ErrorMessage = "Password should contain at least one uppercase letter, one lowercase letter, and one number")]
        public string Password { get; set; }
        public string Role { get; set; } = "User";
    }
}