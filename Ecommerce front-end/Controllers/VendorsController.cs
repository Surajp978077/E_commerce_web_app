using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce_front_end.Data;
using Ecommerce_front_end.Data.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Ecommerce_front_end.Controllers
{

    public class VendorsController : Controller
    {
        private readonly ILogger<VendorsController> _logger;

        // public VendorsController(ILogger<VendorsController> logger)
        // {
        //     _logger = logger;
        // }

        private readonly IVendorsService _service;
        public VendorsController(IVendorsService service)
        {
            _service = service;
        }

        public async Task<IActionResult> Index()
        {
            var ProductsSold = await _service.GetAll();
            return View(ProductsSold);
        }

        public async Task<IActionResult> Products()
        {

        }


        // [HttpPost]
        // public IActionResult AddProduct(int vendorId, int productId)
        // {
        //     var vendor = _context.Vendors.Find(vendorId);
        //     var product = _context.Products.Find(productId);

        //     if (vendor == null || product == null)
        //     {
        //         return NotFound();
        //     }

        //     var productVendor = new ProductVendor
        //     {
        //         VendorId = vendorId,
        //         ProductId = productId
        //     };

        //     vendor.ProductVendors.Add(productVendor);

        //     _context.SaveChanges();

        //     return RedirectToAction("Details", new { id = vendorId });
        // }


        // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        // public IActionResult Error()
        // {
        //     return View("Error!");
        // }
    }
}
