using Ecommerce_front_end.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_front_end.Controllers
{
    public class MoviesController : Controller
    {
        private readonly AppDbContext _context;
        public MoviesController(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            var movies = await _context.Movies
                .Include(m => m.Cinema)
                .OrderBy(n=> n.Name)
                .ToListAsync();

            return View(movies);
        }

    }
}