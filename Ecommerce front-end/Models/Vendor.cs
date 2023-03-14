using System.ComponentModel.DataAnnotations;

namespace Ecommerce_front_end.Models
{

    public class Vendor
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Full name")]
        public String FullName { get; set; }
        public String ProfilePictureURL { get; set; }
        [Display(Name = "Email address")]
        public String Email { get; set; }
        public string Password { get; set; }
        [Display(Name = "Phone number")]
        [Required(ErrorMessage = "Phone number is required")]
        [StringLength(20, MinimumLength = 7, ErrorMessage = "Phone number must be between 7 and 20 digits")]
        [RegularExpression(@"^[0-9]+$", ErrorMessage = "Phone number can only contain digits")]
        public string PhoneNumber { get; set; }

        //Relationships
        public List<Actor_Movie> Actors_Movies { get; set; }
    }
}