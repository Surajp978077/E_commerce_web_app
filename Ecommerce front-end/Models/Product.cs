using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ecommerce_front_end.Data;

namespace Ecommerce_front_end.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public double Price { get; set; }
        public String ImageURL { get; set; }
        public DateTime StartDate { get; set; }
        public int ItemCount { get; set; }

        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; } // To 

        //Relationships
        public List<ProductVendor> ProductVendors { get; set; }

    }
}
