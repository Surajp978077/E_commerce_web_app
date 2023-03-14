using Ecommerce_front_end.Data;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_front_end.Controllers
{
    public class ActorsController : Controller
    {
        private readonly AppDbContext _context;
        public ActorsController(AppDbContext context)
        {
            _context=context;
        }
        public IActionResult Index()
        {
            var data =_context.Actors.ToList();
            return View(data);
        }
    }

}