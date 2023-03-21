using Ecommerce_front_end.Data;
using Ecommerce_front_end.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce_front_end.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

                context.Database.EnsureCreated();

                //Cinema
                if (!context.Vendors.Any())
                {
                    context.Vendors.AddRange(new List<Vendor>()
                    {
                        new Vendor()
                        {
                           FullName="abc d",
                           ProfilePictureURL="https://media.istockphoto.com/id/1319763895/photo/smiling-mixed-race-mature-man-on-grey-background.jpg?s=612x612&w=0&k=20&c=ZiuzNX9LhTMMcRFrYNfq_zFR7O_aH-q7x1L5elko5uU=",
                           Email="abc@gmail.com",
                           Password="abcd",
                           PhoneNumber="1234567890",

                        },
                        new Vendor()
                        {
                          FullName="def g",
                           ProfilePictureURL="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
                           Email="def@gmail.com",
                           Password="defg",
                           PhoneNumber="1234567890",

                        },
                        new Vendor()
                        {
                           FullName="ghi j",
                           ProfilePictureURL="https://thumbs.dreamstime.com/b/questioning-gesture-25604034.jpg",
                           Email="ghi@gmail.com",
                           Password="ghij",
                           PhoneNumber="1234567890",
                        },
                        new Vendor()
                        {
                           FullName="jkl m",
                           ProfilePictureURL="https://www.investnational.com.au/wp-content/uploads/2016/08/person-stock.png",
                           Email="jkl@gmail.com",
                           Password="jklm",
                           PhoneNumber="1234567890",
                        },
                    });
                    context.SaveChanges();
                }

                var parentCategory = new Category();
                var mobileCategory = new Category();
                var chargerCategory = new Category();

                if (!context.Categories.Any())
                {
                    // Create parent category


                    parentCategory.Name = "Mobiles & Accessories";
                    parentCategory.Description = "Category for mobiles and accessories";

                    context.Categories.Add(parentCategory);

                    // Create child category - Mobile

                    mobileCategory.Name = "Mobile";
                    mobileCategory.Description = "Category for mobile phones";
                    mobileCategory.ParentCategory = parentCategory;

                    context.Categories.Add(mobileCategory);

                    // Create child category - Charger

                    chargerCategory.Name = "Charger";
                    chargerCategory.Description = "Category for mobile phone chargers";
                    chargerCategory.ParentCategory = parentCategory;



                    context.Categories.Add(chargerCategory);

                    context.SaveChanges();
                }


                //Products

                if (!context.Products.Any())
                {
                    context.Products.AddRange(new List<Product>()
                    {
                        new Product()
                        {
                            Name="Charger",
                            Description="Charger for Samsung",
                            Price=450,
                            ImageURL="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51G529B1p1L._SL1200_.jpg",
                            ItemCount=10,
                            CategoryId=chargerCategory.CategoryId
                        },
                        new Product()
                        {
                              Name="Samsung",
                            Description="Samsung",
                            Price=10000,
                            ImageURL="https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                            ItemCount=20,
                            CategoryId=mobileCategory.CategoryId
                        },
                        new Product()
                        {
                            Name="Apple",
                            Description="Apple",
                            Price=20000,
                            ImageURL="https://thumbs.dreamstime.com/b/iphone-most-recent-isolated-white-background-46056944.jpg",
                            ItemCount=5,
                            CategoryId=mobileCategory.CategoryId
                        },
                        new Product()
                        {
                            Name="Xiaomi",
                            Description="Xiaomi",
                            Price=15000,
                            ImageURL="https://st4.depositphotos.com/11698096/22999/i/600/depositphotos_229999768-stock-photo-kyiv-ukraine-july-2018-xiaomi.jpg",
                            ItemCount=30,
                            CategoryId=mobileCategory.CategoryId
                        },

                    });
                    context.SaveChanges();
                }




                //ProductVendors
                if (!context.ProductVendors.Any())
                {
                    context.ProductVendors.AddRange(new List<ProductVendor>()
                    {
                        new ProductVendor()
                        {
                           ProductId=1,
                           VendorId=2

                        },
                        new ProductVendor()
                        {
                           ProductId=2,
                           VendorId=2
                        },
                        new ProductVendor()
                        {
                           ProductId=4,
                           VendorId=2
                        },
                        new ProductVendor()
                        {
                           ProductId=3,
                           VendorId=1
                        },

                    });
                    context.SaveChanges();
                }

            }

        }

        // public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        // {
        //     using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
        //     {

        //         //Roles
        //         var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        //         if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
        //             await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        //         if (!await roleManager.RoleExistsAsync(UserRoles.User))
        //             await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

        //         //Users
        //         var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        //         string adminUserEmail = "admin@etickets.com";

        //         var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
        //         if (adminUser == null)
        //         {
        //             var newAdminUser = new ApplicationUser()
        //             {
        //                 FullName = "Admin User",
        //                 UserName = "admin-user",
        //                 Email = adminUserEmail,
        //                 EmailConfirmed = true
        //             };
        //             await userManager.CreateAsync(newAdminUser, "Coding@1234?");
        //             await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
        //         }


        //         string appUserEmail = "user@etickets.com";

        //         var appUser = await userManager.FindByEmailAsync(appUserEmail);
        //         if (appUser == null)
        //         {
        //             var newAppUser = new ApplicationUser()
        //             {
        //                 FullName = "Application User",
        //                 UserName = "app-user",
        //                 Email = appUserEmail,
        //                 EmailConfirmed = true
        //             };
        //             await userManager.CreateAsync(newAppUser, "Coding@1234?");
        //             await userManager.AddToRoleAsync(newAppUser, UserRoles.User);
        //         }
        //     }
        // }
    }
}
