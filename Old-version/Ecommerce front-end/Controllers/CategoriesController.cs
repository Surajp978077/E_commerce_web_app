using Ecommerce_front_end.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ecommerce_front_end.Models;

namespace Ecommerce_front_end.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly AppDbContext _context;
        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ICollection<Category> Category = await _context.Categories
               .Include(m => m.Products).Include(n => n.ChildCategories)
               .ToListAsync();

            return View(Category);
        }
    }
}
