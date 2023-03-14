

using System.ComponentModel.DataAnnotations;

namespace Ecommerce_front_end.Models
{
    public class Producer
    {
        
        [Key]
        public int Id { get; set; }
        public String ProfilePictureURL { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }

        //Relationships
        public List<Movie> Movies { get; set; }
    }
}