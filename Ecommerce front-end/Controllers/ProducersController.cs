using Ecommerce_front_end.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_front_end.Controllers
{
    public class ProducersController :Controller
    {
        private readonly AppDbContext _context;
        public ProducersController(AppDbContext context)
        {
            _context=context;
        }

        public async Task<ActionResult> Index()
        {
            var Producers = await _context.Producers.ToListAsync();
            return View(Producers);
        }
  
    }

}