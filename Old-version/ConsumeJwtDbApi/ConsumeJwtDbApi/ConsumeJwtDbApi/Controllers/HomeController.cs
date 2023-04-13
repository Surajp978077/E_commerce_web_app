using System.Diagnostics;
using System.Text;
using ConsumeJwtDbApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
// using System.Security.Permissions;

namespace ConsumeJwtDbApi.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> LoginUser(UserInfo user)
    {
        // if (!ModelState.IsValid) return View(user);
        using (var httpClientHandler = new HttpClientHandler())
        {
            // httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }; // Below used as not all implementations support this callback, and some throw PlatformNotSupportedException.
            httpClientHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator; // (NOT SECURE) connect to a server with a certificate that shouldn't be validated
            using (var httpClient = new HttpClient(httpClientHandler))
            {
                StringContent stringContent = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json"); // System.Security.Permissions NuGet package required for this to work. Commented method below works without NuGet package.
                using (var response = await httpClient.PostAsync("https://localhost:7044/api/token", stringContent))
                // JsonContent jsonContent = JsonContent.Create(user);
                // using (var response = await httpClient.PostAsync("https://localhost:7044/api/token", jsonContent))
                {
                    string token = await response.Content.ReadAsStringAsync();
                    if (token == "Invalid credentials")
                    {
                        ViewBag.Message = "Incorrect UserId or Password!";
                        return Redirect("~/Home/Index");
                    }
                    HttpContext.Session.SetString("JWToken", token);
                }

                return Redirect("~/Dashboard/Index");
            }
        }

        // using (var httpClient = new HttpClient())
        // {
        //     // StringContent stringContent = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
        //     JsonContent jsonContent = JsonContent.Create(user);
        //     // using (var response = await httpClient.PostAsync("https://localhost:7044/api/token", stringContent))
        //     using (var response = await httpClient.PostAsync("https://localhost:7044/api/token", jsonContent))
        //     {
        //         string token = await response.Content.ReadAsStringAsync();
        //         if (token == "Invalid credentials")
        //         {
        //             ViewBag.Message = "Incorrect UserId or Password!";
        //             return Redirect("~/Home/Index");
        //         }
        //         HttpContext.Session.SetString("JWToken", token);
        //     }

        //     return Redirect("~/Dashboard/Index");
        // }
    }

    public IActionResult Logoff()
    {
        HttpContext.Session.Clear(); // Clear token
        return Redirect("~/Home/Index");
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


    public IActionResult Register()
    {
        return View();
    }

    public async Task<IActionResult> RegisterUser(UserInfo user)
    {
        //  if (!ModelState.IsValid) return View(user);
        using (var httpClientHandler = new HttpClientHandler())
        {
            // httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }; // Below used as not all implementations support this callback, and some throw PlatformNotSupportedException.
            httpClientHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator; // (NOT SECURE) connect to a server with a certificate that shouldn't be validated
            using (var httpClient = new HttpClient(httpClientHandler))
            {
                StringContent stringContent = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json"); // System.Security.Permissions NuGet package required for this to work. Commented method below works without NuGet package.
                using (var response = await httpClient.PostAsync("https://localhost:7044/api/UserInfo", stringContent))
                // JsonContent jsonContent = JsonContent.Create(user);
                // using (var response = await httpClient.PostAsync("https://localhost:7044/api/userinfo", jsonContent))
                {
                    string token = await response.Content.ReadAsStringAsync();
                    // Console.WriteLine(token);
                     return Redirect("~/Home/Index");
                }

               // return Redirect("~/Dashboard/Index");
            }
        }
    }
}
