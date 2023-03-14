using System.ComponentModel.DataAnnotations;

namespace Ecommerce_front_end.Models
{
    public class Cinema
    {
        [Key]
        public int Id { get; set; }
        public String Logo { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }

        //Relationship
        public List<Movie> Movies { get; set; }
    }
}