using System.ComponentModel.DataAnnotations;

namespace Ecommerce_front_end.Models
{
    public class Category
    {

        [Key]
        public int Id { get; set; }
        public String Logo { get; set; }
        public String Title { get; set; }

        public String Description { get; set; }

        //Relationships
        public List<Product> Products { get; set; }
    }
}