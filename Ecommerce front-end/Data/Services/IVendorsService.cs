using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce_front_end.Models;

namespace Ecommerce_front_end.Data.Services
{
    public interface IVendorsService
    {
        Task<IEnumerable<Vendor>> GetAll();
        Vendor GetById(int Id);
        void add(Vendor vendor);
        Vendor update(int Id, Vendor newVendor);
        void Delete(int Id);
        // void addProduct(Product product);
        Task<IEnumerable<Product>> GetProducts(int Id);
    }
}
