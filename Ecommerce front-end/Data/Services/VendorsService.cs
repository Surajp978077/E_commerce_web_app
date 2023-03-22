using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce_front_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_front_end.Data.Services
{
    public class VendorsService : IVendorsService
    {
        private readonly AppDbContext _context;
        public VendorsService(AppDbContext context)
        {
            _context = context;
        }

        public void add(Vendor vendor)
        {

            throw new NotImplementedException();
        }

        public void Delete(int Id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Vendor>> GetAll()
        {
            var result = await _context.Vendors.ToListAsync();
            return result;
        }

        public Vendor GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Product>> GetProducts(int Id)
        {

        }

        public Vendor update(int Id, Vendor newVendor)
        {
            throw new NotImplementedException();
        }
    }
}
