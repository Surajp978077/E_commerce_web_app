using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ecommerce_front_end.Models;
using Ecommerce_front_end.Data;

namespace Ecommerce_front_end.Controllers;

public class HomeController : Controller
{
    private readonly AppDbContext _context;
    // public HomeController(AppDbContext context)
    // {
    //     _context = context;
    // }
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        var products = _context.Products.ToList();
        return View(products);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
