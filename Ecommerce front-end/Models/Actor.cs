using System.ComponentModel.DataAnnotations;

namespace Ecommerce_front_end.Models
{
    public class Actor
    {
        [Key]
        public int Id { get; set; }
        public String ProfilePictureURL { get; set; }
        [Display (Name = "Full name")]
        public String FullName { get; set; }
        [Display (Name = "Email address")]
        public String Email { get; set; }

        //Relationships
        public List<Actor_Movie> Actors_Movies { get; set; }
    }
}