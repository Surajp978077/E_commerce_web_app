using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SimpleLoginRegistration.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connectionString = builder.Configuration.GetConnectionString("default");
            builder.Services.AddDbContext<AppDBContext>(c => c.UseSqlServer(connectionString));

             builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<AppDBContext>();

             builder.Services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Account/Login";
                
            });  


builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
