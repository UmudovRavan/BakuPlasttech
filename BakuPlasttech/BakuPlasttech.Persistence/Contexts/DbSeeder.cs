using System.Threading.Tasks;
using BakuPlastTech.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace BakuPlastTech.Persistence.Contexts;

public static class DbSeeder
{
    public static async Task SeedAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Rolun yoxlanılması və yaradılması
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        // Default Admin istifadəçisinin yoxlanılması və yaradılması
        var adminUser = await userManager.FindByNameAsync("admin");
        if (adminUser == null)
        {
            adminUser = new AppUser
            {
                UserName = "admin",
                Email = "admin@bakuplasttech.az",
                EmailConfirmed = true
            };

            // Güclü şifrə (API qatında Identity tənzimləmələrinə uyğun olmalıdır)
            var result = await userManager.CreateAsync(adminUser, "Admin123!");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}
